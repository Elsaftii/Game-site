import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Register.css";
import leftPhoto from "../../images/left Register.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function signUp(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((error) => {
        if (error.response) {
          seterror(error.response.data.message);
          setisLoading(false);
        }
      });
    if (data.message === "success") {
      sessionStorage.setItem("userMail", JSON.stringify(values.email));
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
        title: `Registered Successfully
        Redirecting...`,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    setisLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Address"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum eight characters, at least one letter and one number, Without special character"
        )
        .required("Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password Doesn't Match")
        .required("Required"),
      age: Yup.number().min(8, "Minimum Age is 8").required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^01[0125][0-9]{8}$/, "Invalid Mobile Number"),
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
        <title>Register</title>
      </Helmet>
      <div className="bg">
        <div className="layer">
          <div className="container">
            <div className="row  rounded-4 mt-5 shadow">
              <div className="col-md-6 p-0">
                <img
                  src={leftPhoto}
                  className="h-100 w-100 p-0 rounded-start ps-0"
                  alt=""
                />
              </div>
              <div className="form col-md-6 p-4 rounded-end">
                <h4 className="text-center pb-3">Create My Account</h4>
                <form onSubmit={formik.handleSubmit} className="row">
                  {error ? (
                    <>
                      {" "}
                      <h4 className="alert alert-dark text-danger fs-6 p-2 w-100 text-center">
                        {error}
                      </h4>
                    </>
                  ) : null}
                  <div className="mb-3 col-6">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3 col-6">
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
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
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="age"
                      placeholder="Age"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.age || true}
                      min={0}
                    />
                    {formik.touched.age && formik.errors.age ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.age}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.phone}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="rePassword"
                      name="rePassword"
                      placeholder="Confirm Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.rePassword}
                    />
                    {formik.touched.rePassword && formik.errors.rePassword ? (
                      <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                        {formik.errors.rePassword}
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
                      onClick={() => seterror("")}
                    >
                      Register
                    </button>
                  )}
                </form>
                <p className="mt-4">
                  Already have an account?{" "}
                  <Link className="text-decoration-none" to={"/login"}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
