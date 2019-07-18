import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function LoginForm({ values, handleChange, isSubmitting, touched, errors, handleSubmit }) {
    // values: comes from mapPropsToValues
    // handleChange: pre-packaged changeHandler, functionality built into Field
    // isSubmitting: state of API call, needs to be coded. Good for loading spinners
    // touched: was element "touched"?
    // errors: When schema / Yup not followed
    // handleSubmit: pre-packaged submitHandler, functionality built into Form
    return (
      <div className="loginForm">
        <Form>
          <Field 
            type = "text" 
            name = "name" 
            placeholder = "name"
            autoComplete = "off"
            // Field has following functs built in 
            // value = {values.name}
            // onChange = {handleChange}
          />
          <p>{touched.name && errors.name}</p>
          <Field 
            type = "text" 
            name = "email" 
            placeholder = "email"
            autoComplete = "off"
          />
          <p>{touched.email && errors.email}</p>
          <Field 
            type="password" 
            name="password" 
            placeholder = "password"
            autoComplete = "off"
          />
          <p>{touched.password && errors.password}</p>
          <Field 
            type = "checkbox" 
            name = "checkbox" 
            placeholder = "Terms of Service"
            autoComplete = "off"
          />
          <p>{touched.checkbox && errors.checkbox}</p>
          <button className="submit-button" disabled={isSubmitting}>
            Submit &rarr;
          </button>
          {isSubmitting && <p>loading</p>}
        </Form>
      </div>
    );
  }

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, checkbox }) {
    return {
      name: name || "",
      email: email || "", 
      password: password || "",
      checkbox: checkbox || false,
      //these end up as "values" up top
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(1)
      .required(),
    email: Yup.string()
      .email("Invalid email")
      .required("Email required"),
    password: Yup.string()
      .min(6, "Password must be minimum of six characters long")
      .required("Password required"),
    checkbox: Yup.boolean().oneOf([true], "Accept user agreement")
  }),

  handleSubmit(values, formikBag) {
    //preventDefault is built into Formik
    formikBag.resetForm();
    formikBag.setSubmitting(true);
    axios.post("https://reqres.in/api/users", values).then(res => {
      console.log(res);
      window.alert(`Welcome`);
      formikBag.setSubmitting(false);
    });
  }
})(LoginForm);

export default FormikLoginForm;