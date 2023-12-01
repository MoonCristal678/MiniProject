// ReusableForm.js
import React, { useState, useEffect } from 'react';

// Define your fieldLabelMap and fieldTypes here
const fieldLabelMap = {
  name: 'Name',
  age: 'Age',
  bloodType: 'Blood Type',
  birthdate: 'Birthdate',
  countryOfBirth: 'Country of Birth',
};

const fieldTypes = {
  name: 'text',
  age: 'number',
  bloodType: 'text',
  birthdate: 'date',
  countryOfBirth: 'text',
};

const ReusableForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    // Use fieldLabelMap and fieldTypes here
  }, [/* Add dependencies if necessary */]);

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any additional validation or processing logic here
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fieldLabelMap).map((fieldName) => (
        <div key={fieldName}>
          <label htmlFor={fieldName}>{fieldLabelMap[fieldName]}:</label>
          <input
            type={fieldTypes[fieldName]}
            id={fieldName}
            value={formData[fieldName] || ''}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            required
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReusableForm;
