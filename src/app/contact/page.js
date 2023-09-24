"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./page.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICEID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID,
        {
          from_name: formData.name,
          to_name: "Rahul Srivastava | Medium Clone",
          from_email: formData.email,
          to_email: "srivastavar433@gmail.com",
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_PUBLICKEY
      )
      .then(
        () => {
          alert("Thank you! I will get back to you as soon as possible.");
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.error(error);
          alert("Ahh, something went wrong. Please try again!");
        }
      );
  };

  return (
    <div className={styles.contact_container}>
      <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
        Contact Us / Give Feedback
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor="message">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.input}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

const generateMetadata = () => {
  return {
    title: "Coder Blog Center - Contact",
  };
};
