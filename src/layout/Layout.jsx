import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout({ cartCount = 0, borrowedCount = 0 }) {
  return (
    <div className="layout-container">
      <Navbar cartCount={cartCount} borrowedCount={borrowedCount} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;