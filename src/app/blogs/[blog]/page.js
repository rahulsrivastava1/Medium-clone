"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const blog = ({ params }) => {
  const [blog, setBlog] = useState("");

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASEURL}/blog`,
        { _id: params.blog },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ marginRight: "10%", marginLeft: "10%" }}>
      {blog === "" ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 style={{ color: "red" }}>{blog.title}</h1>
          <br />
          <br />
          <pre>
            <p style={{ whiteSpace: "pre-wrap", fontSize: "1.25rem" }}>
              {blog.description}
            </p>
          </pre>
          <br />
          <br />
          <hr />
          <p style={{ marginTop: "1rem" }}>
            <span style={{ color: "green" }}>Author :</span> {blog.author}
          </p>
          <p style={{ marginTop: "1rem" }}>
            <span style={{ color: "green" }}>Email :</span> {blog.email}
          </p>
          <p style={{ marginTop: "1rem" }}>
            <span style={{ color: "green" }}>Created At : </span>
            {blog.createdAt?.slice(0, 10)}
          </p>
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default blog;

export const generateMetadata = () => {
  return {
    title: "Coder Blog Center - Blog",
  };
};
