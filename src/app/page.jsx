"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import styles from "../styles/page.module.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 style={{ fontSize: "3rem" }}>Coder Blog Center</h1>
        <h4>A blog website for coder by coder</h4>
      </div>
      <h3 style={{ marginTop: "-3rem", marginLeft: "4rem", color: "red" }}>
        Popular Blog
      </h3>
      <div className={styles.blog_container}>
        {blogs.length === 0 ? (
          <p>Loading...</p>
        ) : (
          blogs
            .slice(0, 3)
            .map((blog, index) => (
              <Card
                key={index}
                title={blog.title}
                description={blog.description}
                _id={blog._id}
              />
            ))
        )}
      </div>
    </main>
  );
}
