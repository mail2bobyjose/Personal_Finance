// src/components/AddStudentForm.jsx
import React, { useState } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  parentName: '',
  parentMobile: '',
  parentEmail: '',
  startDate: '',
};

const AddStudentForm = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Add Student form submitted:', form);
    alert('Student saved (demo).');
    setForm(initialForm);
  };

  return (
    <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 12 }}>Add Student</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, width: '100%' }}>
          <label>
            First Name
            <input name="firstName" type="text" value={form.firstName} onChange={handleChange} required />
          </label>
          <label>
            Last Name
            <input name="lastName" type="text" value={form.lastName} onChange={handleChange} required />
          </label>
          <label>
            Parent Name
            <input name="parentName" type="text" value={form.parentName} onChange={handleChange} required />
          </label>
          <label>
            Parent Mobile
            <input name="parentMobile" type="tel" value={form.parentMobile} onChange={handleChange} required />
          </label>
          <label>
            Parent Email
            <input name="parentEmail" type="email" value={form.parentEmail} onChange={handleChange} required />
          </label>
          <label>
            Start Date
            <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
          </label>
          <div>
            <button type="submit" className="menu-item">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
