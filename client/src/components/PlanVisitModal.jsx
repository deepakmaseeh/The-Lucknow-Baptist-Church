import React, { useState } from 'react';

const PlanVisitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Plan Your Visit</h2>
        <p className="modal-subtitle">We can't wait to meet you! Fill out this form and we'll have a gift ready for you.</p>
        
        <form className="modal-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Your Email" />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="Phone Number" />
          </div>
          <div className="form-group">
            <label>Date of Visit</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Number of People (Adults + Kids)</label>
            <select>
               <option>1</option>
               <option>2</option>
               <option>3-5</option>
               <option>6+</option>
            </select>
          </div>
          <button type="submit" className="btn-gold full-width">SCHEDULE VISIT</button>
        </form>
      </div>
    </div>
  );
};

export default PlanVisitModal;
