import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Joi from "joi";
import api, { registerAccessToken } from "../../api";
import { accessToken } from "../../store";
import _ from "lodash";

import {
  CustomCFormInputGroup,
} from "../../components";

import { CButton } from "@coreui/react";

/**
 * Add user account page.
 */
const AddUserAccountPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentLocation = useLocation().pathname;

  const [formData, setFormData] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Joi schema
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    name: Joi.string().required().label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password"),
  });

  /*
   * Form related functions
   */
  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, [name]: files });
    } else {
      delete formErrors[name];
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle add branch secretary user account
  const handleSubmit = async (e) => {
    // eslint-disable-next-line no-unused-vars
    const { error, value } = schema.validate(formData, { abortEarly: false });
    setLoading(true);
    if (!error) {
      e.preventDefault();
      const accountType = currentLocation.split("/")[2];
      const d = _.pick(formData, ["username", "name", "email", "password"]);
      const user = { ...d, userType: accountType.toUpperCase() };
      try {
        if (!registerAccessToken(accessToken(), history, dispatch)) return;
        // eslint-disable-next-line no-unused-vars
        const [res, data] = await api.auth.register(user);
        if (res.status === 201) {
          toast.success("Successfully Added");
          setFormData(initialValue);
        } else {
          toast.error(
            res.message
              ? res.message
              : "Error occurred. Please try again later."
          );
        }
        setLoading(false);
        return;
      } catch (err) {
        setLoading(false);
        toast.error("Error occurred. Please try again later.");
      }
    } else {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      setFormErrors(errors);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="shadow sm:rounded-lg bg-white p-4 mb-5 mt-8 row g-3">
        {/* <h1 className="text-xl font-semibold mb-3">Branch Ser</h1> */}
        <div className="row g-3">
          <CustomCFormInputGroup
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={formErrors.username}
            uppercase={true}
          />
          <CustomCFormInputGroup
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            uppercase={true}
          />
          <CustomCFormInputGroup
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            uppercase={true}
            mdSize={6}
          />
          <CustomCFormInputGroup
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            uppercase={true}
            mdSize={6}
            type="password"
          />
          <CustomCFormInputGroup
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
            uppercase={true}
            mdSize={6}
            type="password"
          />
        </div>
        <div className="grid justify-end">
          <CButton
            disabled={loading}
            color="primary"
            variant="outline"
            className="mr-2"
            onClick={handleSubmit}
          >
            {" "}
            Submit{" "}
          </CButton>
        </div>
      </div>
    </>
  );
};

export default AddUserAccountPage;

const initialValue = {
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
