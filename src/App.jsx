import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";

function App() {
  // Cart holding books selected for bulk borrowing
  const [cart, setCart] = useState([]);

  // State holding completed borrowed book records
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Toggle book in/out of cart
  const handleToggleCart = (book) => {
    setCart((prevCart) => {
      const exists = prevCart.some((item) => item.id === book.id || item.title === book.title);
      if (exists) {
        return prevCart.filter((item) => item.id !== book.id && item.title !== book.title);
      } else {
        return [...prevCart, book];
      }
    });
  };

  // Remove single book from cart
  const handleRemoveFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Handle bulk borrow submission
  const handleBulkBorrow = (studentName, studentRollNo, studentYear, borrowDays, returnDate) => {
    if (cart.length === 0) return;

    const newRecords = cart.map((book) => ({
      id: `${book.id || Date.now()}-${Math.random()}`,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookCover: book.cover,
      category: book.category,
      studentName,
      studentRollNo,
      studentYear,
      borrowDays,
      returnDate,
      borrowDate: new Date().toLocaleDateString(),
    }));

    setBorrowedBooks((prev) => [...prev, ...newRecords]);
    setCart([]); // Empty cart after borrowing
    alert(`🎉 Success! ${newRecords.length} books borrowed by ${studentName} (Roll No: ${studentRollNo}). Return by ${returnDate}.`);
  };

  // Handle returning a book
  const handleReturnBook = (recordId) => {
    setBorrowedBooks((prev) => prev.filter((item) => item.id !== recordId));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              cartCount={cart.length}
              borrowedCount={borrowedBooks.length}
            />
          }
        >
          <Route index element={<Home />} />
          <Route
            path="books"
            element={
              <Books
                cart={cart}
                onToggleCart={handleToggleCart}
                onBulkBorrow={handleBulkBorrow}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="checkout"
            element={
              <Checkout
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={handleClearCart}
                onBulkBorrow={handleBulkBorrow}
                borrowedBooks={borrowedBooks}
                onReturnBook={handleReturnBook}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;