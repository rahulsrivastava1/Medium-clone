import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  const router = useRouter();

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.clear("token");
    setIsLoggedIn(true);
    router.push("/");
  };

  return (
    <nav className={styles.mainnav}>
      <div>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="/blogs">
            <li>Blogs</li>
          </Link>
          <Link href="/contact">
            <li>Contact</li>
          </Link>
          {token && (
            <Link href="/write">
              <li>
                <FontAwesomeIcon icon={faEdit} />
                <span style={{ marginLeft: "1rem" }}>Write</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
      <div className={styles.btn_container}>
        {token !== null ? (
          <>
            <Link href="/profile" className={styles.login_link}>
              Profile
            </Link>
            <button className={styles.btn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <ul>
            <Link href="/login" className={styles.login_link}>
              Login
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
