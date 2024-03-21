import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import leftPhoto from "../../images/let login.png";
import axios from "axios";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function signUp(values) {
    setisLoading(true);
    let { data } = await axios
      .put(
        "https://route-ecommerce.onrender.com/api/v1/auth/resetPassword",
        values
      )
      .catch((error) => {
        if (error.response) {
          seterror(error.response.data.message);
          setisLoading(false);
        }
      });
    if (data.token) {
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
        title: `Password Changed`,
      });
    }
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    setisLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: JSON.parse(sessionStorage.getItem("userMail")),
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Address"),
      newPassword: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum eight characters, at least one letter and one number, Without special character"
        )
        .required("Required"),
    }),

    onSubmit: signUp,
  });

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="list of games that can be played both online and offline on Windows operating system as well as on various web browsers. The list includes popular games from various genres such as action, adventure, puzzle, racing, and more. Users can easily browse through the list, choose their desired game"
        />
        <title>Reset Password</title>
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
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      disabled
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.newPassword}
                      </div>
                    ) : null}
                  </div>
                  {isLoading ? (
                    <button className="btn btn-primary w-75 m-auto">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary w-75 m-auto"
                    >
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
