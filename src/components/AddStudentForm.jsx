// src/components/AddStudentForm.jsx
import React, { useState } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  parentName: '',
  parentMobile: '',
  parentEmail: '',
  startDate: '',
  subjects: [],
};

const subjectsList = ['Maths', 'English', 'Drawing'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AddStudentForm = () => {
  const [form, setForm] = useState(initialForm);
  const [studentId, setStudentId] = useState(null);
  const [activeTab, setActiveTab] = useState('demo');

  const [demo, setDemo] = useState({ date: '', time: '', teacher: '' });
  const [regularClasses, setRegularClasses] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: '' }), {})
  );
  const [suspension, setSuspension] = useState({ startDate: '', endDate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const payload = {
        studentFirstName: form.firstName,
        lastName: form.lastName,
        parentName: form.parentName,
        parentEmail: form.parentEmail,
        parentMobile: form.parentMobile,
        startDate: form.startDate,
        subjects: form.subjects,
      };

      const response = await fetch(
        'https://hcnfaq912k.execute-api.ap-southeast-2.amazonaws.com/dev/students',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setStudentId(data.studentId);
        alert(`✅ Student added successfully! ID: ${data.studentId}`);
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Network or server error');
    }
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
