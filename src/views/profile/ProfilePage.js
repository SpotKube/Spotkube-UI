import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi";
import { CButton, CFormSwitch } from "@coreui/react";
import _ from "lodash";

import { CustomCFormInputGroup } from "../../components";
import { thunks, accessToken } from "../../store";
import { registerAccessToken } from "../../api";
import { LoadingIndicator } from "../../components";
import api from "../../api";
import { shallowEqual } from "../../utils/functions";

/**
 * Profile page
 */
const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [initialAccount, setInitialAccount] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [passwordData, setPasswordData] = useState(initialPasswordState);
  const [passwordSection, setPasswordSection] = useState(false);
  const [passwordError, setPasswordError] = useState({});

  useEffect(() => {
    fetchData().catch((err) => {
      console.log(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      registerAccessToken(accessToken(), history, dispatch);
      const [res, data] = await dispatch(thunks.user.getUserData());
      if (res.status === 200) {
        setFormData(data);
        setInitialAccount(data);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  // Joi schema
  const schema = Joi.object({
    name: Joi.string().optional().label("Full name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .optional()
      .allow("")
      .label("Email"),
  });

  // Joi schema for password change
  const passwordSchema = Joi.object({
    newPassword: Joi.string().exist().min(7).label("Password"),
    oldPassword: Joi.string().exist().min(7).label("Current Password"),
    confirmPassword: Joi.string()
      .equal(Joi.ref("newPassword"))
      .label("Confirm Password"),
  });

  /*
   * Handlers
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    delete formErrors[name];
    setFormData({ ...formData, [name]: value });
  };

  // Handle update account button click
  const handleSubmit = async (e) => {
    if (!updateMode || shallowEqual(formData, initialAccount)) {
      return;
    }
    const updatedData = _.pick(formData, ["name", "email"]);
    setLoading(true);
    const { error, value } = schema.validate(updatedData, {
      abortEarly: false,
    });
    if (!error) {
      try {
        registerAccessToken(accessToken(), history, dispatch);

        // eslint-disable-next-line no-unused-vars
        const [res, data] = await dispatch(
          thunks.user.updateUserProfile(value)
        );
        if (res.status === 200) {
          toast.success("Account updated successfully");
          setInitialAccount(formData);
        } else {
          toast.error("Something went wrong. Please try again later");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error updating account");
      } finally {
        setLoading(false);
      }
    } else {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      setFormErrors({ ...formErrors, ...errors });
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
    // eslint-disable-next-line no-unused-vars
    const { error, value } = passwordSchema.validate(passwordData, {
      abortEarly: false,
    });
    if (!error) {
      e.preventDefault();
      const d = _.pick(passwordData, ["oldPassword", "newPassword"]);
      if (!registerAccessToken(accessToken(), history, dispatch)) return;

      // eslint-disable-next-line no-unused-vars
      const [res, data] = await api.auth.changePassword(d);
      if (res.status === 200) {
        toast.success("Password Updated Successfully");
        setPasswordSection(false);
      } else {
        toast.error(
          res.message ? res.message : "Error occurred. Please try again later."
        );
      }
      setLoading(false);
      return;
    } else {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      setPasswordError(errors);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="shadow sm:rounded-lg bg-white p-4 mt-2 mb-5 row g-3">
        {loading ? (
          <div className="flex justify-center"> {LoadingIndicator("lg")} </div>
        ) : (
          <div>
            <div className="grid justify-end">
              <CFormSwitch
                size="lg"
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
                label: "Email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                error: formErrors.email,
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
                readOnly: !updateMode,
              })}
            </div>
            <div className="flex justify-end" hidden={!updateMode}>
              <div className="justify-end">
                <CButton
                  disabled={loading}
                  color="primary"
                  variant="outline"
                  className="mr-2"
                  onClick={handleSubmit}
                >
                  Update Profile
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
                  <div className="row g-3">
                    {CustomCFormInputGroup({
                      label: "Current Password",
                      name: "oldPassword",
                      value: passwordData.oldPassword,
                      error: passwordError.oldPassword,
                      onChange: handlePasswordChange,
                      uppercase: true,
                      required: false,
                      readOnly: !updateMode,
                      mdSize: 6,
                      type: "password",
                    })}
                  </div>
                  {CustomCFormInputGroup({
                    label: "New Password",
                    name: "newPassword",
                    value: passwordData.newPassword,
                    error: passwordError.newPassword,
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
                      onClick={handlePasswordSubmit}
                    >
                      Update Password
                    </CButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;

const initialState = {
  name: "",
  email: "",
  username: "",
};

const initialPasswordState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
