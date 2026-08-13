import React, { useState } from "react";
import { ACADEMIC_YEARS, APP_CONFIG } from "../config/constants";

function BorrowModal({ books = [], onClose, onSubmitBulkBorrow }) {
  const [studentName, setStudentName] = useState("");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [studentYear, setStudentYear] = useState(ACADEMIC_YEARS[0]);
  const [borrowDays, setBorrowDays] = useState(APP_CONFIG.DEFAULT_BORROW_DAYS);

  if (!books || books.length === 0) return null;

  const daysNum = parseInt(borrowDays, 10) || 1;
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + daysNum);
  const formattedReturnDate = returnDate.toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentRollNo.trim()) {
      alert("Please fill in Student Name and Roll Number.");
      return;
    }

    onSubmitBulkBorrow(
      studentName.trim(),
      studentRollNo.trim(),
      studentYear,
      daysNum,
      formattedReturnDate
    );
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="borrow-modal-card bulk-borrow-modal" onClick={(e) => e.stopPropagation()}>
        <button className="borrow-modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <h2 className="borrow-modal-heading">
          Bulk Borrow Form ({books.length} {books.length === 1 ? "Book" : "Books"})
        </h2>

        {/* Selected Books List Summary */}
        <div className="bulk-books-summary-list">
          <p className="summary-label">Selected Books for Borrowing:</p>
          <div className="summary-scroll-area">
            {books.map((b, idx) => (
              <div key={idx} className="bulk-book-item">
                <img src={b.cover} alt={b.title} className="bulk-book-thumb" />
                <div className="bulk-book-info">
                  <h4>{b.title}</h4>
                  <p>by {b.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Details Form */}
        <form onSubmit={handleSubmit} className="borrow-form">
          <div className="form-group">
            <label htmlFor="studentName">Student Name *</label>
            <input
              id="studentName"
              type="text"
              placeholder="e.g. Alex Johnson"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentRollNo">Roll Number / Student ID *</label>
            <input
              id="studentRollNo"
              type="text"
              placeholder="e.g. CS2026-042"
              value={studentRollNo}
              onChange={(e) => setStudentRollNo(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="studentYear">Academic Year</label>
              <select
                id="studentYear"
                value={studentYear}
                onChange={(e) => setStudentYear(e.target.value)}
              >
                {ACADEMIC_YEARS.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="borrowDays">Borrow Duration (Days)</label>
              <input
                id="borrowDays"
                type="number"
                min={APP_CONFIG.MIN_BORROW_DAYS}
                max={APP_CONFIG.MAX_BORROW_DAYS}
                value={borrowDays}
                onChange={(e) => setBorrowDays(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="return-date-box">
            Expected Return Date: <strong>{formattedReturnDate}</strong>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button confirm-btn">
              Confirm & Borrow All ({books.length})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BorrowModal;
