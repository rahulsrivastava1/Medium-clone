"use client";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coder Blog Center",
  description: "Medium clone - Best used for Writing Tech Blog",
  keywords: "NextJS CoderBlog Blog Coder",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/login", "/signup"];

  return (
    <html lang="en">
      <body className={inter.className}>
        {!hideNavbarRoutes.includes(pathname) && <Navbar />}
        {children}
      </body>
    </html>
  );
}
