import React from "react";
import { APP_CONFIG } from "../config/constants";

function About() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="page">
      <h1>About Our Library</h1>

      <p>Discover a wide collection of programming, fiction, science, and history books online.</p>
      <p>Explore thousands of real titles fetched dynamically from open book repositories.</p>
      <p>A house of knowledge and wisdom for all students and learners.</p>
      <p>Issea zyada motivations aur koi wesite pe nhi milega.</p>
      <br />
      <p>&copy; {currentYear} {APP_CONFIG.BRAND_NAME}. All rights reserved.</p>
    </div>
  );
}

export default About;