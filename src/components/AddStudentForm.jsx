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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const newSubjects = checked
        ? [...prev.subjects, value]
        : prev.subjects.filter((s) => s !== value);
      return { ...prev, subjects: newSubjects };
    });
  };

  const submitForm = async (e) => {
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

  const submitDemo = () => {
    console.log('Demo details for studentId:', studentId, demo);
    alert(`Demo scheduled on ${demo.date} at ${demo.time} with ${demo.teacher}`);
    setDemo({ date: '', time: '', teacher: '' });
  };

  const submitClasses = () => {
    console.log('Regular classes for studentId:', studentId, regularClasses);
    alert('Regular classes saved!');
  };

  const submitSuspension = () => {
    console.log('Suspension for studentId:', studentId, suspension);
    alert('Suspension dates saved!');
  };

  // Styles for tabs
  const tabButtonStyle = (tab) => ({
    padding: '8px 16px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderBottom: activeTab === tab ? 'none' : '1px solid #ccc',
    background: activeTab === tab ? '#fff' : '#f0f0f0',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    fontWeight: activeTab === tab ? 'bold' : 'normal',
  });

  const tabContentStyle = {
    border: '1px solid #ccc',
    padding: 16,
    background: '#fff',
    borderTop: 'none',
    borderRadius: '0 0 4px 4px',
  };

  return (
    <div style={{ padding: 16, display: 'flex', justifyContent: 'center', background: 'lightgray' }}>
      <div style={{ width: '100%', maxWidth: 600 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 12 }}>Add Student</h2>
        <form onSubmit={submitForm} style={{ display: 'grid', gap: 20, width: '100%' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <label style={{ flex: 1 }}>
              First Name:
              <input name="firstName" type="text" value={form.firstName} onChange={handleChange} required />
            </label>
            <label style={{ flex: 1 }}>
              Last Name:
              <input name="lastName" type="text" value={form.lastName} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Parent's Name:
            <input name="parentName" type="text" value={form.parentName} onChange={handleChange} required />
          </label>
          <label>
            Parent's Mobile:
            <input name="parentMobile" type="tel" value={form.parentMobile} onChange={handleChange} required />
          </label>
          <label>
            Parent's Email:
            <input name="parentEmail" type="email" value={form.parentEmail} onChange={handleChange} required />
          </label>
          <label>
            Start Date:
            <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
          </label>
          <fieldset style={{ border: '1px solid #ccc', padding: 10 }}>
            <legend>Subjects:</legend>
            {subjectsList.map((subject) => (
              <label key={subject} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  value={subject}
                  checked={form.subjects.includes(subject)}
                  onChange={handleCheckboxChange}
                />
                {subject}
              </label>
            ))}
          </fieldset>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>

        {studentId && (
          <div style={{ marginTop: 20 }}>
            <h3>Student Additional Details</h3>

            {/* Tab buttons */}
            <div style={{ display: 'flex' }}>
              <div style={tabButtonStyle('demo')} onClick={() => setActiveTab('demo')}>Demo</div>
              <div style={tabButtonStyle('classes')} onClick={() => setActiveTab('classes')}>Regular Classes</div>
              <div style={tabButtonStyle('suspension')} onClick={() => setActiveTab('suspension')}>Suspension</div>
            </div>

            {/* Tab content */}
            <div style={tabContentStyle}>
              {activeTab === 'demo' && (
                <div style={{ display: 'grid', gap: 10 }}>
                  <label>
                    Demo Date:
                    <input type="date" value={demo.date} onChange={(e) => setDemo({ ...demo, date: e.target.value })} />
                  </label>
                  <label>
                    Demo Time:
                    <input type="time" value={demo.time} onChange={(e) => setDemo({ ...demo, time: e.target.value })} />
                  </label>
                  <label>
                    Teacher:
                    <input type="text" value={demo.teacher} onChange={(e) => setDemo({ ...demo, teacher: e.target.value })} />
                  </label>
                  <button type="button" onClick={submitDemo}>Save Demo</button>
                </div>
              )}

              {activeTab === 'classes' && (
                <div style={{ display: 'grid', gap: 10 }}>
                  {daysOfWeek.map((day) => (
                    <label key={day}>
                      {day}:
                      <input
                        type="time"
                        value={regularClasses[day]}
                        onChange={(e) => setRegularClasses({ ...regularClasses, [day]: e.target.value })}
                      />
                    </label>
                  ))}
                  <button type="button" onClick={submitClasses}>Save Classes</button>
                </div>
              )}

              {activeTab === 'suspension' && (
                <div style={{ display: 'grid', gap: 10 }}>
                  <label>
                    Start Date:
                    <input
                      type="date"
                      value={suspension.startDate}
                      onChange={(e) => setSuspension({ ...suspension, startDate: e.target.value })}
                    />
                  </label>
                  <label>
                    End Date:
                    <input
                      type="date"
                      value={suspension.endDate}
                      onChange={(e) => setSuspension({ ...suspension, endDate: e.target.value })}
                    />
                  </label>
                  <button type="button" onClick={submitSuspension}>Save Suspension</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudentForm;
