"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../../styles/page.module.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASEURL}/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((error) => console.log(error));
  }, []);

  const findDays = (value) => {
    const createdDate = new Date(value);
    const currentDate = new Date();
    const timeDifference = currentDate - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Blogs</h1>
      <div className={styles.container}>
        {blogs.length === 0 ? (
          <p>Loading...</p>
        ) : (
          blogs.map((blog, index) => (
            <div key={index} style={{ lineHeight: "2rem" }}>
              <div style={{ padding: "0.5rem 0 2rem 0" }}>
                <h3>{blog.title}</h3>
                <p className={styles.description}>{blog.description}</p>
                <p>
                  <span style={{ color: "green" }}>Author :</span> {blog.author}
                </p>
                <button
                  style={{ width: "10%", height: "2rem" }}
                  onClick={() => router.push(`/blogs/${blog._id}`)}
                >
                  More...
                </button>
                <span style={{ marginLeft: "50rem" }}>
                  {findDays(blog.createdAt)} day/s ago
                </span>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Blogs;

export const generateMetadata = () => {
  return {
    title: "Coder Blog Center - Blogs",
  };
};
