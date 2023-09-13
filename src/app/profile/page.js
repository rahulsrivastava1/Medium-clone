"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import avatar from "../../../public/avatar.png";
import styles from "./page.module.css";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
    } else {
      const email = sessionStorage.getItem("email");
      if (email) {
        axios
          .post(
            "http://localhost:3000/api/profile",
            { email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => setUser(res.data.user))
          .catch((error) => console.log(error));
      }
      axios
        .post(
          "http://localhost:3000/api/userblogs",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => setBlogs(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_details}>
        <Image
          className={styles.avatar}
          src={avatar}
          alt="Avatar"
          height={200}
        />
        <div className={styles.details}>
          {user === null ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2>{user?.fullname}</h2>
              <p>Email: {user?.email}</p>
            </>
          )}
        </div>
      </div>
      <div className={styles.blog_list}>
        <h3 style={{ marginBottom: "2rem" }}>Your Blogs</h3>
        <ul style={{ listStyle: "none", lineHeight: "2rem" }}>
          {blogs.length === 0 ? (
            <p>Loading...</p>
          ) : (
            blogs.map((blog, index) => (
              <Link href={`/blogs/${blog._id}`} style={{ color: "blue" }}>
                <li>{blog.title}</li>
              </Link>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;

export const generateMetadata = () => {
  return {
    title: "Coder Blog Center - Profile",
  };
};
