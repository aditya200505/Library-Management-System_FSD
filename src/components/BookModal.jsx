import React from "react";

function BookModal({ book, onClose, onBorrow }) {
  if (!book) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="modal-body">
          <div className="modal-cover-wrapper">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="modal-cover-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/200x280?text=No+Cover";
              }}
            />
            {book.category && (
              <span className="badge badge-category">{book.category}</span>
            )}
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">by <strong>{book.author}</strong></p>

            <div className="modal-meta-grid">
              {book.publishYear && (
                <div className="meta-item">
                  <span className="meta-label">First Published</span>
                  <span className="meta-value">{book.publishYear}</span>
                </div>
              )}
              {book.pages && (
                <div className="meta-item">
                  <span className="meta-label">Pages</span>
                  <span className="meta-value">{book.pages}</span>
                </div>
              )}
              {book.editionCount && (
                <div className="meta-item">
                  <span className="meta-label">Editions</span>
                  <span className="meta-value">{book.editionCount}</span>
                </div>
              )}
            </div>

            {book.description && (
              <div className="modal-description-box">
                <h4>Synopsis & Details</h4>
                <p>{book.description}</p>
              </div>
            )}

            {book.subjects && book.subjects.length > 0 && (
              <div className="modal-subjects">
                <h4>Topics</h4>
                <div className="subject-tags">
                  {book.subjects.map((sub, i) => (
                    <span key={i} className="subject-tag">{sub}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button
                className="primary-button borrow-modal-btn"
                onClick={() => {
                  onBorrow(book);
                  onClose();
                }}
              >
                Borrow This Book
              </button>
              <button className="secondary-button" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
