import React from "react";
import { getFallbackCover } from "../services/bookApi";

function BookCard({ id, title, author, cover, category, isInCart, onToggleCart }) {
  const bookData = { id, title, author, cover, category };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getFallbackCover(title, category);
  };

  return (
    <div className={`product-card ${isInCart ? "selected-card" : ""}`}>
      <div className="product-card-image-box">
        <img
          src={cover || getFallbackCover(title, category)}
          alt={title}
          className="product-card-img"
          onError={handleImageError}
        />
        {category && <span className="product-card-badge">{category}</span>}
        {isInCart && <span className="selected-check-badge">✓ Selected</span>}
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title" title={title}>
          {title}
        </h3>
        <p className="product-card-author">by <span>{author}</span></p>

        <button
          className={`product-card-btn ${isInCart ? "btn-added" : ""}`}
          onClick={() => onToggleCart && onToggleCart(bookData)}
        >
          {isInCart ? "✓ Remove from Cart" : "+ Add to Borrow Cart"}
        </button>
      </div>
    </div>
  );
}

export default BookCard;