import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Welcome to the Library Management System!</h1>
      <p>Discover a vast collection of programming, fiction, science, and history books online.</p>

      <img
        src="https://www.pngall.com/wp-content/uploads/2018/05/Books-Transparent.png"
        alt="Library Books"
        className="home-image"
      />

      <div>
        <button className="primary-button" onClick={() => navigate("/books")}>
          Explore Books
        </button>
      </div>
    </div>
  );
}

export default Home;