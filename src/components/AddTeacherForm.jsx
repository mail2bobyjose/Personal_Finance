// src/components/AddTeacherForm.jsx
import React, { useState } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  subjects: [],
  mobile: '',
  email: '',
  startDate: '',
};

const AddTeacherForm = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject) => {
    setForm((prev) => {
      const exists = prev.subjects.includes(subject);
      const subjects = exists
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Add Teacher form submitted:', form);
    alert('Teacher saved (demo).');
    setForm(initialForm);
  };

  return (
    <div style={{ padding: 16, display: 'flex', justifyContent: 'center', border: '2px solid red' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 12 }}>Add Teacher</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, width: '100%' }}>
          <label>
            First Name
            <input name="firstName" type="text" value={form.firstName} onChange={handleChange} required />
          </label>
          <label>
            Last Name
            <input name="lastName" type="text" value={form.lastName} onChange={handleChange} required />
          </label>
          <fieldset style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
            <legend style={{display: 'flex' }} >Subjects</legend>
            {['Maths', 'English', 'Science', 'Drawing'].map((subj) => (
              <label key={subj} style={{ display: 'inline', alignItems: 'left', paddingRight: '20px', marginBottom: 8 }}>
                <input
                  type="checkbox"
                  checked={form.subjects.includes(subj)}
                  onChange={() => handleSubjectToggle(subj)}
                />
                {subj}
              </label>
            ))}
          </fieldset>
          <label>
            Mobile
            <input name="mobile" type="tel" value={form.mobile} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
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

export default AddTeacherForm;
