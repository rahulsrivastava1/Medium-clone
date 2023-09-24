"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../styles/page.module.css";

const Write = () => {
  const initialState = {
    title: "",
    description: "",
    author: "",
    email: "",
  };

  useEffect(() => {
    initialState.author = sessionStorage.getItem("username");
    initialState.email = sessionStorage.getItem("email");
  }, []);

  const [blog, setBlog] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const validateFields = (values) => {
    let errors = {};

    if (!values.title) {
      errors.title = "There must be a title!";
    }

    if (!values.description) {
      errors.description = "Description is required to publish a blog!";
    }

    return errors;
  };

  const apiCall = () => {
    axios
      .post("http://localhost:3000/api/write", blog)
      .then((res) => {
        const notify = () => toast(res.data.message);
        notify();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateFields(blog));
    apiCall();
    setBlog(initialState);
  };

  return (
    <>
      <div>
        <h3 style={{ textAlign: "center" }}>Write a blog</h3>
        <form
          onSubmit={handleSubmit}
          style={{ marginLeft: "20%", marginTop: "1rem" }}
        >
          <div>
            <textarea
              type="text"
              name="title"
              id="title"
              placeholder="Title here..."
              value={blog.title}
              rows={3}
              onChange={handleChange}
              className={styles.textarea}
              style={{ overflow: "hidden" }}
            />
            <p className={styles.error}>{formErrors.title}</p>
          </div>
          <div>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Content here..."
              value={blog.description}
              rows={15}
              onChange={handleChange}
              className={styles.textarea}
            />
            <p className={styles.error}>{formErrors.description}</p>
          </div>
          <button className={styles.publish_btn}>Publish</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Write;

const generateMetadata = () => {
  return {
    title: "Coder Blog Center - Write a Blog",
  };
};
