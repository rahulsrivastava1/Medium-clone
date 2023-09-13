"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Card.module.css";

const Card = ({ title, description, _id }) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      <h6 style={{ fontSize: "1rem", margin: "0.5rem" }}>{title}</h6>
      <hr />
      <p className={styles.description}>{description}</p>
      <button
        style={{ marginTop: "1rem" }}
        onClick={() => router.push(`/blogs/${_id}`)}
      >
        More...
      </button>
    </div>
  );
};

export default Card;
