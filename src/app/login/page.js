"use client";
import { useState } from "react";
import login_img from "../../../public/login.gif";
import Image from "next/image";
import axios from "axios";
import styles from "./page.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setformErrors] = useState({});

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const apiCall = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASEURL}/login`, formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", res.data.fullname);
        sessionStorage.setItem("email", res.data.email);
        if (res.data.token) {
          router.push("/");
        }
        const notify = () => toast(res.data.message);
        notify();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(validateFields(formValues));
    apiCall();
    setFormValues(initialState);
  };

  const validateFields = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };

  return (
    <>
      <h1 style={{ marginTop: "3rem", textAlign: "center" }}>Login Here</h1>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label className={styles.label} id="email">
                Email ID:
              </label>
              <input
                className={styles.text_field}
                type="text"
                name="email"
                placeholder="enter your email..."
                value={formValues.email}
                onChange={handleChange}
              />
              <p className={styles.error}>{formErrors.email}</p>
            </div>
            <div className={styles.form_group}>
              <label className={styles.label} id="password">
                Password:
              </label>
              <input
                className={styles.text_field}
                type="password"
                name="password"
                placeholder="enter your password..."
                value={formValues.password}
                onChange={handleChange}
              />
              <p className={styles.error}>{formErrors.password}</p>
            </div>
            <div className={styles.btn_container}>
              <button type="submit" className={styles.btn}>
                Login
              </button>
              <Link href="/signup" className={styles.link}>
                New, Go to Signup Page!
              </Link>
            </div>
          </form>
        </div>
        <div className={styles.right}>
          <Image
            src={login_img}
            width={400}
            height={400}
            alt="login page image"
          />
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Login;

const generateMetadata = () => {
  return {
    title: "Coder Blog Center - Login Page",
  };
};
