"use client";
import { useState } from "react";
import login_img from "../../../public/login.gif";
import Image from "next/image";
import axios from "axios";
import styles from "../login/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const initialState = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const apiCall = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASEURL}/signup`, formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const notify = () => toast(res.data.message);
        notify();
        if (res.status === 200) {
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateFields(formValues));
    apiCall();
    setFormValues(initialState);
  };

  const validateFields = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fullname) {
      errors.fullname = "Full Name is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not valid!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4 && values.password.length > 10) {
      errors.password =
        "Password must be more than 4 characters and less than 10 characters";
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Confirm Password must match with password!";
    }

    return errors;
  };

  return (
    <>
      <h1 style={{ marginTop: "2rem", textAlign: "center" }}>Signup Here</h1>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label className={styles.label} id="fullname">
                Full Name:
              </label>
              <input
                className={styles.text_field}
                type="text"
                name="fullname"
                placeholder="enter your fullname..."
                value={formValues.fullname}
                onChange={handleChange}
              />
              <p className={styles.error}>{formErrors.fullname}</p>
            </div>
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
            <div className={styles.form_group}>
              <label className={styles.label} id="confirmPassword">
                Confirm Password:
              </label>
              <input
                className={styles.text_field}
                type="password"
                name="confirmPassword"
                placeholder="again type your password..."
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              <p className={styles.error}>{formErrors.confirmPassword}</p>
            </div>
            <div className={styles.btn_container}>
              <button type="submit" className={styles.btn}>
                Sign Up
              </button>
              <Link href="/login" className={styles.link}>
                Already have an account, Go to Login Page!
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

export default Signup;

const generateMetadata = () => {
  return {
    title: "Coder Blog Center - Signup Page",
  };
};
