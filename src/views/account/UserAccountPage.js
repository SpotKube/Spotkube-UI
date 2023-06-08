import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi";
import { CButton, CFormSwitch } from "@coreui/react";
import _ from "lodash";

import api, { registerAccessToken } from "../../api";
import { accessToken, selectors } from "../../store";

// import { CustomModal } from "../../components";
import { CustomCFormInputGroup, CustomModal } from "../../components";

const UserAccountPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useLocation().state.account;
  // eslint-disable-next-line no-unused-vars
  const loggedInUserAccountType = useSelector(selectors.user.selectUserType);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(account);
  const [initialAccount, setInitialAccount] = useState(account);
  const [formErrors, setFormErrors] = useState(initialState);
  const [updateMode, setUpdateMode] = useState(false);
  const [passwordData, setPasswordData] = useState(initialPasswordState);
  const [passwordSection, setPasswordSection] = useState(false);
  const [passwordError, setPasswordError] = useState({});

  // Modal related states.
  const [modalVisibility, setModalVisibility] = useState(false);

  // Fetch user data.
  useEffect(() => {
    // eslint 
    // eslint-disable-next-line no-unused-vars
    let isSubscribed = true;
    setLoading(true);
    const fetchUserData = async () => {
      // if (!registerAccessToken(accessToken(), history, dispatch)) return;
      // const res = await api.user.getUserAccount(userId);
      //
      // if (res.status === 200) {
      //     setFormData(res.data);
      //     setInitialAccount(res.data);
      // } else {
      //     console.log("Error fetching user data", res);
      //     toast.error("Alternative selected more than once");
      // }
    };
    fetchUserData().catch((err) => console.log(err));
    setFormData(account);
    setLoading(false);
    // Cancel any pending request
    return () => (isSubscribed = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Joi schema
  const schema = Joi.object({
    name: Joi.string().optional().label("Full Name"),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .optional()
      .label("Email"),
  });

  // Joi schema for password change
  const passwordSchema = Joi.object({
    password: Joi.string().exist().min(7).label("Password"),
    confirmPassword: Joi.string()
      .equal(Joi.ref("password"))
      .label("Confirm Password"),
  });

  /*
   * Handling Button Presses
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, [name]: files });
    } else {
      delete formErrors[name];
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    if (!updateMode) {
      return;
    }
    e.preventDefault();
    try {
      const updatedData = _.pick(formData, ["name", "email"]);
      // eslint-disable-next-line no-unused-vars
      const { error, value } = schema.validate(updatedData, {
        abortEarly: false,
      });
      setLoading(true);
      if (!error) {
        if (!registerAccessToken(accessToken(), history, dispatch)) return;
        const res = await api.user.adminEditProfile( {...updatedData, username: formData.username});
        if (res.status === 200) {
          toast.success(
            res.message ? res.message : "Account updated successfully."
          );
          setInitialAccount(formData);
        } else {
          toast.error(
            res.message
              ? res.message
              : "Error occurred. Please try again later."
          );
        }
        setLoading(false);
        return;
      } else {
        const errors = {};
        for (let item of error.details) {
          errors[item.path[0]] = item.message;
        }
        setFormErrors(errors);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    delete passwordError[name];
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Handle password submit
  const handlePasswordSubmit = async (e) => {
    if (!updateMode) {
      return;
    }
    setLoading(true);
    try {
      const d = {
        password: passwordData.password,
        username: formData.username,
      };
      if (!registerAccessToken(accessToken(), history, dispatch)) return;

      // eslint-disable-next-line no-unused-vars
      const [res, data] = await api.user.resetPassword(d);
      if (res.status === 200) {
        toast.success(
          res.message ? res.message : "Password Updated Successfully"
        );
        setPasswordSection(false);
      } else {
        toast.error(
          res.message ? res.message : "Error occurred. Please try again later."
        );
      }
      setLoading(false);
      setModalVisibility(false);
    } catch (err) {
      toast.error("Error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setModalVisibility(false);
      setPasswordData(initialPasswordState);
    }
  };

  const showModal = () => {
    // eslint-disable-next-line no-unused-vars
    const { error, value } = passwordSchema.validate(passwordData, {
      abortEarly: false,
    });
    if (!error) {
      setModalVisibility(true);
    } else {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      setPasswordError(errors);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="shadow sm:rounded-lg bg-white p-4 mt-2 mb-5 row g-3">
        <CustomModal
          visible={modalVisibility}
          onSubmit={handlePasswordSubmit}
          onClose={() => setModalVisibility(false)}
          message="Are you sure you want to change password?"
          submitLabel="Change Password"
          loading={loading}
        />
        <div className="grid justify-end">
          <CFormSwitch
            //   size="xl"
            label="Enable Update Mode"
            id="formSwitchCheckDefault"
            onChange={() => {
              setUpdateMode(!updateMode);
              setFormData(initialAccount);
              setPasswordSection(false);
            }}
          />
        </div>
        <div className="row g-3">
          {CustomCFormInputGroup({
            label: "Name",
            name: "name",
            value: formData.name,
            onChange: handleChange,
            error: formErrors.name,
            uppercase: true,
            required: false,
            readOnly: !updateMode,
          })}
          {CustomCFormInputGroup({
            label: "Username",
            name: "username",
            value: formData.username,
            onChange: handleChange,
            error: formErrors.username,
            uppercase: true,
            required: false,
            readOnly: true,
            mdSize: 6,
          })}
          {CustomCFormInputGroup({
            label: "Email Address",
            name: "email",
            value: formData.email,
            onChange: handleChange,
            error: formErrors.email,
            uppercase: true,
            required: false,
            readOnly: !updateMode,
            mdSize: 6,
          })}
        </div>
        <div className="flex justify-end" hidden={!updateMode}>
          <div className="grid justify-end" hidden={!updateMode}>
            <CButton
              disabled={loading}
              color="primary"
              variant="outline"
              className="mr-2"
              onClick={handleSubmit}
            >
              Update Account
            </CButton>
          </div>
          <div className="grid justify-start" hidden={!updateMode}>
            <CButton
              disabled={loading}
              color="primary"
              variant="ghost"
              className="mr-2"
              onClick={() => {
                setPasswordSection(!passwordSection);
              }}
            >
              Change Password
            </CButton>
          </div>
        </div>
        <div>
          {passwordSection && (
            <div className="row g-3">
              {CustomCFormInputGroup({
                label: "Password",
                name: "password",
                value: passwordData.password,
                error: passwordError.password,
                onChange: handlePasswordChange,
                uppercase: true,
                required: false,
                readOnly: !updateMode,
                mdSize: 6,
                type: "password",
              })}
              {CustomCFormInputGroup({
                label: "Confirm Password",
                name: "confirmPassword",
                value: passwordData.confirmPassword,
                error: passwordError.confirmPassword,
                onChange: handlePasswordChange,
                uppercase: true,
                required: false,
                readOnly: !updateMode,
                mdSize: 6,
                type: "password",
              })}
              <div className="grid justify-start" hidden={!updateMode}>
                <CButton
                  disabled={loading}
                  color="primary"
                  variant="outline"
                  className="mr-2"
                  onClick={showModal}
                >
                  Update Password
                </CButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserAccountPage;

const initialState = {
  name: "",
  email: "",
  status: "",
  username: "",
};

const initialPasswordState = {
  password: "",
  confirmPassword: "",
};
