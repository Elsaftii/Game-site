import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import leftPhoto from "../../images/let login.png";
import axios from "axios";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [codeSent, setcodeSent] = useState(false);

  async function getResetCode(values) {
    setisLoading(true);
    seterror("");
    let { data } = await axios
      .post(
        process.env.REACT_APP_AUTH_URL+
        "/api/v1/auth/forgotPasswords",
        values
      )
      .catch((error) => {
        if (error.response) {
          seterror(error.response.data.message);
          setisLoading(false);
        }
      });
    if (data.statusMsg === "success") {
      setcodeSent(true);
      sessionStorage.setItem("userMail", JSON.stringify(values.email));
      document.querySelector("#email").setAttribute("disabled", "");
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        background: "#1d2024",
        color: "white",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: `Reset code sent to your email`,
      });
    }
    setisLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Address"),
    }),

    onSubmit: getResetCode,
  });

  //////Reset///////
  async function resetPassword(values) {
    setisLoading(true);
    seterror("");
    let { data } = await axios
      .post(
        process.env.REACT_APP_AUTH_URL+"/api/v1/auth/verifyResetCode",
        values
      )
      .catch((error) => {
        if (error.response) {
          seterror(error.response.data.message);
          setisLoading(false);
        }
      });

    if (data.status === "Success") {
      navigate("/resetpassword");
    }
    setisLoading(false);
  }

  const formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },

    onSubmit: resetPassword,
  });
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="list of games that can be played both online and offline on Windows operating system as well as on various web browsers. The list includes popular games from various genres such as action, adventure, puzzle, racing, and more. Users can easily browse through the list, choose their desired game"
        />
        <title>Forgot Password</title>
      </Helmet>
      <div className="bg">
        <div className="layer">
          <div className="container">
            <div className="row rounded-4 mt-5 shadow">
              <div className="col-md-6 p-0">
                <img
                  src={leftPhoto}
                  className="h-100 w-100 p-0 rounded-start ps-0"
                  alt=""
                />
              </div>
              <div className="form d-flex flex-column justify-content-center col-md-6 p-4 rounded-end">
                <h4 className="text-center pb-3">Reset Password</h4>
                <form onSubmit={formik.handleSubmit} className="row">
                  {error ? (
                    <>
                      {" "}
                      <h4 className="alert alert-dark text-danger fs-6 p-2 w-100 text-center">
                        {error}
                      </h4>
                    </>
                  ) : null}
                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  {!codeSent ? (
                    <>
                      {isLoading ? (
                        <button className="btn btn-primary w-75 m-auto">
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary w-75 m-auto"
                        >
                          Get Code
                        </button>
                      )}
                    </>
                  ) : null}
                </form>

                <form onSubmit={formik2.handleSubmit} className="row">
                  {codeSent ? (
                    <div className="mb-4">
                      <input
                        type="resetCode"
                        className="form-control"
                        id="resetCode"
                        name="resetCode"
                        placeholder="Reset Code"
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.resetCode}
                        maxLength={6}
                      />
                      {formik2.touched.resetCode && formik2.errors.resetCode ? (
                        <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                          {formik2.errors.resetCode}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {codeSent ? (
                    <>
                      {isLoading ? (
                        <button className="btn btn-primary w-75 m-auto">
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary w-75 me-auto ms-auto"
                          onClick={resetPassword}
                        >
                          Submit Code
                        </button>
                      )}
                    </>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
