import React from 'react';
import '../styles/Checkbox.css';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="checkbox">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

export default Checkbox;