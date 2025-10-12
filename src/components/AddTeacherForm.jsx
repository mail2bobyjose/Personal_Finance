// src/components/AddTeacherForm.jsx
import React, { useState } from 'react';

const subjectsList = ['Maths', 'English', 'Drawing'];


const initialForm = {
  teacherfirstname: '',
  teacherlastname: '',
  taughtsubjects: [],
  teachermobile: '',
  teacheremail: '',
  teacherstartdate: '',
};

const style = {
  page: {
    background: '#f4f6f8',
    minHeight: '100vh',
    padding: '32px 16px',
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
    background: '#fff',
    padding: 24,
    borderRadius: 8,
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 24,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    alignItems: 'flex-start',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 14,
    fontWeight: 500,
    color: '#34495e',
    width: '100%', // full width by default
  },
  halfWidthContainer: {
    display: 'flex',
    gap: 20,
    width: '100%',
    marginBottom: 10,
  },
  halfWidthField: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginTop: 6,
    padding: 10,
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 4,
    display: 'flex',
  },
  button: {
    padding: '10px 18px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 600,
    marginTop: 10,
  },
  fieldset: {
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: 12,
    width: '100%',
  },
  legend: {
    display: 'flex',
    fontWeight: 600,
    color: '#34495e',
    marginBottom: 8,
  },
  checkboxLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 8,
    fontWeight: 400,
    fontSize: 14,
    color: '#34495e',
    cursor: 'pointer',
  },
  checkboxInput: {
    marginRight: 6,
  },
};

const AddTeacherForm = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [teacherid, setteacherid] = useState(null);

  const handleSubjectToggle = (subject) => {
    setForm((prev) => {
      const exists = prev.taughtsubjects.includes(subject);
      const taughtsubjects = exists
        ? prev.taughtsubjects.filter((s) => s !== subject)
        : [...prev.taughtsubjects, subject];
      return { ...prev, taughtsubjects };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        teacherfirstname: form.teacherfirstname,
        teacherlastname: form.teacherlastname,
        taughtsubjects: form.taughtsubjects,
        teachermobile: form.teachermobile,
        teacheremail: form.teacheremail,
        teacherstartdate: form.teacherstartdate,
      };

      console.log(payload);
      const response = await fetch(
        'https://lemvz53c6g.execute-api.ap-southeast-2.amazonaws.com/dev/addteacher',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setteacherid(data.teacherid);
        alert(`✅ Teacher added successfully! ID: ${data.teacherid}`);
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
    <div style={style.page}>
      <div style={style.container}>
        <h2 style={style.heading}>Add Teacher</h2>
        <form onSubmit={handleSubmit} style={style.form}>
          {/* Two fields side by side: First Name and Last Name */}
          <div style={style.halfWidthContainer}>
            <label style={{ ...style.label, ...style.halfWidthField }}>
              Teacher First Name
              <input
                name="teacherfirstname"
                type="text"
                value={form.teacherfirstname}
                onChange={handleChange}
                required
                style={style.input}
              />
            </label>
            <label style={{ ...style.label, ...style.halfWidthField }}>
              Teacher Last Name
              <input
                name="teacherlastname"
                type="text"
                value={form.teacherlastname}
                onChange={handleChange}
                required
                style={style.input}
              />
            </label>
          </div>

          {/* Subjects as a fieldset */}
          <fieldset style={style.fieldset}>
            <legend style={style.legend}>Taught Subjects</legend>
            {subjectsList.map((subj) => (
              <label key={subj} style={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.taughtsubjects.includes(subj)}
                  onChange={() => handleSubjectToggle(subj)}
                  style={style.checkboxInput}
                />
                {subj}
              </label>
            ))}
          </fieldset>

          {/* Two fields side by side: Mobile and Email */}
          <div style={style.halfWidthContainer}>
            <label style={{ ...style.label, ...style.halfWidthField }}>
              Teacher Mobile
              <input
                name="teachermobile"
                type="tel"
                value={form.teachermobile}
                onChange={handleChange}
                required
                style={style.input}
              />
            </label>
            <label style={{ ...style.label, ...style.halfWidthField }}>
              Teacher Email
              <input
                name="teacheremail"
                type="email"
                value={form.teacheremail}
                onChange={handleChange}
                required
                style={style.input}
              />
            </label>
          </div>

          {/* Full width: Start Date */}
          <label style={style.label}>
            Teacher Start Date
            <input
              name="teacherstartdate"
              type="date"
              value={form.teacherstartdate}
              onChange={handleChange}
              required
              style={style.input}
            />
          </label>

          <button type="submit" style={style.button}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherForm;
