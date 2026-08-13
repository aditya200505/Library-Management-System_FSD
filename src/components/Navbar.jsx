import React from "react";
import { NavLink } from "react-router-dom";
import { APP_CONFIG } from "../config/constants";

function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <h2>{APP_CONFIG.BRAND_NAME}</h2>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Books Catalog</NavLink>
        <NavLink to="/checkout" className="cart-nav-item">
          Borrow Cart
          {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;