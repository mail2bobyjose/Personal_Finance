import React, { useState, useEffect } from 'react';

const UpdateStudentForm = () => {
  const initialForm = {
    studentFirstName: '',
    studentLastName: '',
    parentFirstName: '',
    parentLastName: '',
    parentMobileNumber: '',
    parentEmail: '',
    locationCountry: '',
    locationState: '',
  };

  const [form, setForm] = useState(initialForm);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSearchChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'studentFirstName' && value.length >= 3) {
      try {
        const payload = { keyword: value };
        const response = await fetch(
          'https://qxgzn4ezm0.execute-api.ap-southeast-2.amazonaws.com/dev/searchstudent',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();
        console.log('Search response:', data);

        if (response.ok && data.results && data.results.length > 0) {
          setSearchResults([...data.results]);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    console.log('Updated searchResults:', searchResults);
  }, [searchResults]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentSelect = (e) => {
    const selectedId = e.target.value;
    const student = searchResults.find((s) => s.studentId === selectedId);
    if (student) {
      setSelectedStudent(student);

 setForm({
  studentFirstName: student.studentFirstName || '',
  studentLastName: student.studentLastName || '',
  parentFirstName: student.parentFirstName || '',  // Only if exists in future
  parentLastName: student.parentLastName || '',    // Only if exists in future
  parentMobileNumber: student.parentMobileNumber || '',
  parentEmail: student.parentEmail || '',
  locationCountry: student.locationCountry || '',  // Only if exists in future
  locationState: student.locationState || '',      // Only if exists in future
});

      setSearchResults([]);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    alert('Student information updated successfully!');
  };

  // Inline styles (unchanged)
  const style = {
    container: {
      maxWidth: 800,
      margin: '0 auto',
      padding: 24,
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: 8,
      marginTop: 40,
    },
    heading: {
      textAlign: 'center',
      fontSize: 24,
      marginBottom: 20,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 14,
    },
    input: {
      padding: 10,
      fontSize: 14,
      border: '1px solid #ccc',
      borderRadius: 4,
      marginTop: 6,
    },
    select: {
      padding: 10,
      fontSize: 14,
      border: '1px solid #ccc',
      borderRadius: 4,
      marginTop: 6,
    },
    button: {
      marginTop: 20,
      padding: '10px 16px',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: 4,
      fontSize: 16,
      cursor: 'pointer',
    },
  };

  return (
    <div style={style.container}>
      <h2 style={style.heading}>Update Student</h2>
      <form style={style.form} onSubmit={submitForm}>
        <label style={style.label}>
          Student First Name
          <input
            type="text"
            name="studentFirstName"
            value={form.studentFirstName}
            onChange={handleSearchChange}
            style={style.input}
            placeholder="Enter at least 3 characters"
            required
          />
        </label>

        {form.studentFirstName.length >= 3 && searchResults.length > 0 && (
          <label style={style.label}>
            Select Student
            <select style={style.select} onChange={handleStudentSelect} defaultValue="">
              <option value="">-- Choose a student --</option>
              {searchResults.map((student) => (
                <option key={student.studentId} value={student.studentId}>
                  {student.studentFirstName} {student.studentLastName}
                </option>
              ))}
            </select>
          </label>
        )}

        <label style={style.label}>
          Student Last Name
          <input
            type="text"
            name="studentLastName"
            value={form.studentLastName}
            onChange={handleChange}
            style={style.input}
            required
          />
        </label>

        <label style={style.label}>
          Parent First Name
          <input
            type="text"
            name="parentFirstName"
            value={form.parentFirstName}
            onChange={handleChange}
            style={style.input}
            required
          />
        </label>

        <label style={style.label}>
          Parent Last Name
          <input
            type="text"
            name="parentLastName"
            value={form.parentLastName}
            onChange={handleChange}
            style={style.input}
            required
          />
        </label>

        <label style={style.label}>
          Parent Mobile Number
          <input
            type="tel"
            name="parentMobileNumber"
            value={form.parentMobileNumber}
            onChange={handleChange}
            style={style.input}
            required
          />
        </label>

        <label style={style.label}>
          Parent Email
          <input
            type="email"
            name="parentEmail"
            value={form.parentEmail}
            onChange={handleChange}
            style={style.input}
            required
          />
        </label>

        <label style={style.label}>
          Location Country
          <input
            type="text"
            name="locationCountry"
            value={form.locationCountry}
            onChange={handleChange}
            style={style.input}
          />
        </label>

        <label style={style.label}>
          Location State
          <input
            type="text"
            name="locationState"
            value={form.locationState}
            onChange={handleChange}
            style={style.input}
          />
        </label>

        <button type="submit" style={style.button}>
          Update Student
        </button>
      </form>
    </div>
  );
};

export default UpdateStudentForm;
