import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
const subjectsList = ['Math', 'Science', 'English', 'History']; // Add actual subjects
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const UpdateStudentForm = () => {
  const initialForm = {
    searchStudentFirstName: '',
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
  const [activeTab, setActiveTab] = useState('demo');
   // Demo states
    const [showDemoForm, setShowDemoForm] = useState(false);
    const [demoForm, setDemoForm] = useState({ date: '', startTime: '', endTime: '', subject: '', teacher: '' });
    const [demos, setDemos] = useState([]);
   
    // Rate states
    const [showRateForm, setShowRateForm] = useState(false);
    const [rateForm, setRateForm] = useState({ amount: '', currency: '', startDate: '', endDate: '', subject: '' });
  
    // Regular Classes
    const [showClassForm, setShowClassForm] = useState(false);
    const [classForm, setClassForm] = useState({ day: '', startTime: '', endTime: '', subject: '', teacher: '' });
    const [regularClasses, setRegularClasses] = useState([]);
  
    // Suspension
    const [showSuspensionForm, setShowSuspensionForm] = useState(false);
    const [suspensionForm, setSuspensionForm] = useState({ startDate: '', endDate: '', subject: '' });
    const [suspensions, setSuspensions] = useState([]);
  

  const handleSearchChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'searchStudentFirstName' && value.length >= 3) {
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


  //Function to handle section of students from the student drop down

  const handleStudentSelect = (e) => {
    const selectedId = e.target.value;
    const student = searchResults.find((s) => s.studentId === selectedId);
    if (student) {
      setSelectedStudent(student);
    console.log(student.studentId); 

 setForm((prevForm) =>({
     ...prevForm,
  studentFirstName: student.studentFirstName || '',
  studentLastName: student.studentLastName || '',
  parentFirstName: student.parentFirstName || '',  // Only if exists in future
  parentLastName: student.parentLastName || '',    // Only if exists in future
  parentMobileNumber: student.parentMobileNumber || '',
  parentEmail: student.parentEmail || '',
  locationCountry: student.locationCountry || '',  // Only if exists in future
  locationState: student.locationState || '',      // Only if exists in future
  searchStudentFirstName: '',
}));

      setSearchResults([]);
      retrievedemos(student);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    alert('Student information updated successfully!');
  };

  
 //Add new Demo form handle change and function to set demo end time to 60mins from start time.

const handleDemoChange = (e) => {
  const { name, value } = e.target;

  setDemoForm((prev) => {
    const updatedForm = { ...prev, [name]: value };

    // If the startTime is being updated
    if (name === 'startTime') {
      const [hours, minutes] = value.split(':').map(Number);
      const startDate = new Date();
      startDate.setHours(hours);
      startDate.setMinutes(minutes + 60); // Add 60 minutes

      const endHours = String(startDate.getHours()).padStart(2, '0');
      const endMinutes = String(startDate.getMinutes()).padStart(2, '0');
      const calculatedEndTime = `${endHours}:${endMinutes}`;

      // Only auto-set endTime if it's empty or equal to previous default
      if (!prev.endTime || prev.endTime === calculateDefaultEndTime(prev.startTime)) {
        updatedForm.endTime = calculatedEndTime;
      }
    }

    return updatedForm;
  });
};

// Helper function to calculate default end time from a given start time
function calculateDefaultEndTime(startTime) {
  if (!startTime) return '';
  const [hours, minutes] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hours);
  startDate.setMinutes(minutes + 60);

  const endHours = String(startDate.getHours()).padStart(2, '0');
  const endMinutes = String(startDate.getMinutes()).padStart(2, '0');
  return `${endHours}:${endMinutes}`;
};

 const selectedteacher = ({teacherid:'1234',teacherfirstname: 'sumathi',teacherlastname: 'valavu'  });


//Function to be added to retrieve student details to show in tabnavs

const retrievedemos = async (student) => {
  console.log('insdie demo retrieval function');
  try {
    const payload = {
     studentId: student.studentId,

    };

    console.log('Submitting payload:', payload);

    const response = await fetch('https://u0k5cdwk64.execute-api.ap-southeast-2.amazonaws.com/dev/addclass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data.classid);
    if (response.ok) {
      alert('✅ Class saved successfully!');
    } else {
      alert(`❌ Error: ${data.message}`);
    }

  } catch (err) {
    console.error('❌ Network or server error:', err);
    alert('❌ An error occurred while saving the demo.');
  }
};





  const addDemo = () => {
    if (!demoForm.date || !demoForm.startTime || !demoForm.endTime || !demoForm.subject || !demoForm.teacher) {
      alert('Please fill all demo fields');
      return;
    }
    setDemos((prev) => [...prev, demoForm]);
    const demopayload = demoForm;
    console.log (demopayload);
    setDemoForm({ date: '', startTime: '', endTime: '', subject: '', teacher: '' });
    setShowDemoForm(false);
  };


//Function to save demo to backend.

  const saveDemo = async () => {
  const timezone = selectedStudent.timezone || 'Asia/Kolkata'; // default fallback
  const startUTC = DateTime.fromISO(`${demoForm.date}T${demoForm.startTime}`, { zone: timezone }).toUTC().toISO(); 
  const endUTC = DateTime.fromISO(`${demoForm.date}T${demoForm.endTime}`, { zone: timezone }).toUTC().toISO(); 

  try {
    const payload = {
      studentId: selectedStudent.studentId,
      studentLastName: selectedStudent.studentLastName,
      studentFirstName: selectedStudent.studentFirstName,
      classstartutc: startUTC,
      classendutc: endUTC,
      classsubject: demoForm.subject,
      classteacherid: selectedteacher.teacherid,
      classteacherfirstname: selectedteacher.teacherfirstname,
      classteacherlaststname: selectedteacher.teacherlastname,
      classstatus: 'proposed',
      classtype: 'demo'
    };

    console.log('Submitting payload:', payload);

    const response = await fetch('https://u0k5cdwk64.execute-api.ap-southeast-2.amazonaws.com/dev/addclass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data.classid);
    if (response.ok) {
      alert('✅ Class saved successfully!');
    } else {
      alert(`❌ Error: ${data.message}`);
    }

  } catch (err) {
    console.error('❌ Network or server error:', err);
    alert('❌ An error occurred while saving the demo.');
  }
};



  // Rate handlers
  const handleRateChange = (e) => {
    const { name, value } = e.target;
    setRateForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveRate = () => {
    if (
      !rateForm.amount ||
      !rateForm.currency ||
      !rateForm.startDate ||
      !rateForm.subject
    ) {
      alert('Please fill all required rate fields (Hourly Rate, Currency, Start Date, Subject)');
      return;
    }
    alert('Rate saved!');
  };

  // Class handlers
  const handleClassChange = (e) => {
    const { name, value } = e.target;
    setClassForm((prev) => ({ ...prev, [name]: value }));
  };

  const addRegularClass = () => {
    if (
      !classForm.day ||
      !classForm.startTime ||
      !classForm.endTime ||
      !classForm.subject ||
      !classForm.teacher
    ) {
      alert('Please fill all regular class fields');
      return;
    }
    setRegularClasses((prev) => [...prev, classForm]);
    setClassForm({ day: '', startTime: '', endTime: '', subject: '', teacher: '' });
    setShowClassForm(false);
  };

  // Suspension handlers
  const handleSuspensionChange = (e) => {
    const { name, value } = e.target;
    setSuspensionForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSuspension = () => {
    if (!suspensionForm.startDate || !suspensionForm.endDate) {
      alert('Please fill Suspension Start and End Dates');
      return;
    }
    setSuspensions((prev) => [...prev, suspensionForm]);
    setSuspensionForm({ startDate: '', endDate: '', subject: '' });
    setShowSuspensionForm(false);
  };

  // Inline styles (unchanged)
    const style = {
    page: {
      background: '#f4f6f8',
      minHeight: '100vh',
      padding: '5px 16px',
    },
    container: {
      maxWidth: 900,
      margin: '0 auto',
      padding: 24,
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: 8,
      marginTop: 1,
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
    // For the two fields side by side container (override width)
    halfWidthContainer: {
      display: 'flex',
      gap: 20,
      width: '100%',
      marginBottom: 10,
    },

    // Each half inside that container is flex column with ~50% width
    halfWidthField: {
      flex: '1 1 50%',
      display: 'flex',
      flexDirection: 'column',
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
      tabNav: {
      display: 'flex',
      marginBottom: -1,
      marginTop: 40,
      border: '1px solid #ccc',
    },
    tabBtn: (isActive) => ({
      padding: '8px 16px',
      cursor: 'pointer',
      border: '1px solid #ccc',
      borderBottom: isActive ? 'none' : '1px solid #ccc',
      background: isActive ? '#fff' : '#f0f0f0',
      fontWeight: isActive ? 'bold' : 'normal',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    }),
    tabContent: {
      border: '1px solid #ccc',
      borderTop: 'none',
      background: '#fff',
      padding: 16,
      borderRadius: '0 0 4px 4px',
      minHeight:30,
    },
    smallBtn: {
      //padding: '1px 1px',
      fontSize: 12,
      backgroundColor: '#2ecc71',
      color: '#fff',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      float: 'inline-end',
      marginBottom:10,
      minHeight: 20,
    },

 
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: 12,
    },
    th: {
      border: '1px solid #ddd',
      padding: 8,
      background: '#ecf0f1',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #ddd',
      padding: 8,
    },
  };

  return (
    <div style={style.page}>
    <div style={style.container}>
      <h2 style={style.heading}>Update Student</h2>
<form style={style.form} onSubmit={submitForm}>
  <div style={style.halfWidthContainer}>
    <label style={{ ...style.label, ...style.halfWidthField }}>
      Search Student First Name
      <input
        type="text"
        name="searchStudentFirstName"
        value={form.searchStudentFirstName}
        onChange={handleSearchChange}
        style={style.input}
        placeholder="Enter at least 3 characters"
        required
      />
    </label>

    {form.searchStudentFirstName.length >= 3 && searchResults.length > 0 && (
      <label style={{ ...style.label, ...style.halfWidthField }}>
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
  </div>
</form>
      <form style={style.form} onSubmit={submitForm}>
         <div style={style.halfWidthContainer}>
            <label style={style.halfWidthField}>
              Student First Name
              <input
                type="text"
                name="studentFirstName"
                value={form.studentFirstName}
                onChange={handleChange}
                style={style.input}
                required
              />
            </label>
            <label style={style.halfWidthField}>
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
          </div>

  {/* Parent First and Last Name side by side */}
          <div style={style.halfWidthContainer}>
            <label style={style.halfWidthField}>
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
            <label style={style.halfWidthField}>
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
          </div>

          {/* Parent Mobile Number */}
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

          {/* Parent Email */}
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

          {/* Location Country and State side by side */}
          <div style={style.halfWidthContainer}>
            <label style={style.halfWidthField}>
              Location Country
              <input
                type="text"
                name="locationCountry"
                value={form.locationCountry}
                onChange={handleChange}
                style={style.input}
              />
            </label>
            <label style={style.halfWidthField}>
              Location State
              <input
                type="text"
                name="locationState"
                value={form.locationState}
                onChange={handleChange}
                style={style.input}
              />
            </label>
          </div>

        <button type="submit" style={style.button}>
          Update Student
        </button>
      </form>
      {/* Tabs for Demo, Rate, Regular Classes, Suspension */}
        < div style={style.tabNav}>
          {['demo', 'rate', 'regular Class', 'suspension'].map((tab) => (
            <button
              key={tab}
              style={style.tabBtn(activeTab === tab)}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={style.tabContent}>
          {/* Demo Tab */}
          {activeTab === 'demo' && (
            <>
              {!showDemoForm && (
                <button disabled={!selectedStudent}
                   style={{...style.smallBtn,...(!selectedStudent && {backgroundColor: '#cccccc',color: '#666666', cursor: 'not-allowed'})}}
                  onClick={() => setShowDemoForm(true)}
                  type="button"
                >
                  Add Demo
                </button>
              )}
              {showDemoForm && (
                <form
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    addDemo();
                  }}
                >
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Date
                    <input
                      type="date"
                      name="date"
                      value={demoForm.date}
                      onChange={handleDemoChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 20%' }}>
                    Start Time
                    <input
                      type="time"
                      name="startTime"
                      value={demoForm.startTime}
                      onChange={handleDemoChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 20%' }}>
                    End Time
                    <input
                      type="time"
                      name="endTime"
                      value={demoForm.endTime}
                      onChange={handleDemoChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Subject
                    <select
                      name="subject"
                      value={demoForm.subject}
                      onChange={handleDemoChange}
                      style={style.input}
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjectsList.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Teacher
                    <input
                      type="text"
                      name="teacher"
                      value={demoForm.teacher}
                      onChange={handleDemoChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <div style={{ flex: '1 1 100%', marginTop: 10 }}>
                    <button style={style.button} onClick={(demoForm) => saveDemo()} type="submit">
                      Save Demo
                    </button>
                    <button
                      style={{ ...style.button, marginLeft: 8, backgroundColor: '#e74c3c' }}
                      type="button"
                      onClick={() => setShowDemoForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {demos.length > 0 && (
                <table style={style.table}>
                  <thead>
                    <tr>
                      <th style={style.th}>Date</th>
                      <th style={style.th}>Start Time</th>
                      <th style={style.th}>End Time</th>
                      <th style={style.th}>Subject</th>
                      <th style={style.th}>Teacher</th>
                      <th style={style.th}>Type</th>
                      <th style={style.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demos.map((demo, idx) => (
                      <tr key={idx}>
                        <td style={style.td}>{demo.date}</td>
                        <td style={style.td}>{demo.startTime}</td>
                        <td style={style.td}>{demo.endTime}</td>
                        <td style={style.td}>{demo.subject}</td>
                        <td style={style.td}>{demo.teacher}</td>
                        <td style={style.td}>{'Demo'}</td>
                         <td style={style.td}>{'Proposed'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* Rate Tab */}
          {activeTab === 'rate' && (
            <>
              {!showRateForm && (
                <button
                  style={style.smallBtn}
                  onClick={() => setShowRateForm(true)}
                  type="button"
                >
                  Add Rate
                </button>
              )}
              {showRateForm && (
                <form
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveRate();
                  }}
                >
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Hourly Rate
                    <input
                      type="number"
                      name="amount"
                      value={rateForm.amount}
                      onChange={handleRateChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Currency
                    <input
                      type="text"
                      name="currency"
                      value={rateForm.currency}
                      onChange={handleRateChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Start Date
                    <input
                      type="date"
                      name="startDate"
                      value={rateForm.startDate}
                      onChange={handleRateChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    End Date
                    <input
                      type="date"
                      name="endDate"
                      value={rateForm.endDate}
                      onChange={handleRateChange}
                      style={style.input}
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Subject
                    <select
                      name="subject"
                      value={rateForm.subject}
                      onChange={handleRateChange}
                      style={style.input}
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjectsList.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div style={{ flex: '1 1 100%', marginTop: 10 }}>
                    <button style={style.button} type="submit">
                      Save Rate
                    </button>
                    <button
                      style={{ ...style.button, marginLeft: 8, backgroundColor: '#e74c3c' }}
                      type="button"
                      onClick={() => setShowRateForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* Regular Classes Tab */}
          {activeTab === 'regular' && (
            <>
              {!showClassForm && (
                <button
                  style={style.smallBtn}
                  onClick={() => setShowClassForm(true)}
                  type="button"
                >
                  Add Regular Class
                </button>
              )}
              {showClassForm && (
                <form
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    addRegularClass();
                  }}
                >
                  <label style={{ ...style.label, flex: '1 1 20%' }}>
                    Day
                    <select
                      name="day"
                      value={classForm.day}
                      onChange={handleClassChange}
                      style={style.input}
                      required
                    >
                      <option value="">Select Day</option>
                      {daysOfWeek.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label style={{ ...style.label, flex: '1 1 20%' }}>
                    Start Time
                    <input
                      type="time"
                      name="startTime"
                      value={classForm.startTime}
                      onChange={handleClassChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 20%' }}>
                    End Time
                    <input
                      type="time"
                      name="endTime"
                      value={classForm.endTime}
                      onChange={handleClassChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 20%' }}>
                    Subject
                    <select
                      name="subject"
                      value={classForm.subject}
                      onChange={handleClassChange}
                      style={style.input}
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjectsList.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label style={{ ...style.label, flex: '1 1 20%' }}>
                    Teacher
                    <input
                      type="text"
                      name="teacher"
                      value={classForm.teacher}
                      onChange={handleClassChange}
                      style={style.input}
                      required
                    />
                  </label>

                  <div style={{ flex: '1 1 100%', marginTop: 10 }}>
                    <button style={style.button} type="submit">
                      Save Class
                    </button>
                    <button
                      style={{ ...style.button, marginLeft: 8, backgroundColor: '#e74c3c' }}
                      type="button"
                      onClick={() => setShowClassForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {regularClasses.length > 0 && (
                <table style={style.table}>
                  <thead>
                    <tr>
                      <th style={style.th}>Day</th>
                      <th style={style.th}>Start Time</th>
                      <th style={style.th}>End Time</th>
                      <th style={style.th}>Subject</th>
                      <th style={style.th}>Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regularClasses.map((cls, idx) => (
                      <tr key={idx}>
                        <td style={style.td}>{cls.day}</td>
                        <td style={style.td}>{cls.startTime}</td>
                        <td style={style.td}>{cls.endTime}</td>
                        <td style={style.td}>{cls.subject}</td>
                        <td style={style.td}>{cls.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* Suspension Tab */}
          {activeTab === 'suspension' && (
            <>
              {!showSuspensionForm && (
                <button
                  style={style.smallBtn}
                  onClick={() => setShowSuspensionForm(true)}
                  type="button"
                >
                  Add Suspension
                </button>
              )}
              {showSuspensionForm && (
                <form
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    addSuspension();
                  }}
                >
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Start Date
                    <input
                      type="date"
                      name="startDate"
                      value={suspensionForm.startDate}
                      onChange={handleSuspensionChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    End Date
                    <input
                      type="date"
                      name="endDate"
                      value={suspensionForm.endDate}
                      onChange={handleSuspensionChange}
                      style={style.input}
                      required
                    />
                  </label>
                  <label style={{ ...style.label, flex: '1 1 30%' }}>
                    Subject
                    <select
                      name="subject"
                      value={suspensionForm.subject}
                      onChange={handleSuspensionChange}
                      style={style.input}
                    >
                      <option value="">Select Subject (optional)</option>
                      {subjectsList.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div style={{ flex: '1 1 100%', marginTop: 10 }}>
                    <button style={style.button} type="submit">
                      Save Suspension
                    </button>
                    <button
                      style={{ ...style.button, marginLeft: 8, backgroundColor: '#e74c3c' }}
                      type="button"
                      onClick={() => setShowSuspensionForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {suspensions.length > 0 && (
                <table style={style.table}>
                  <thead>
                    <tr>
                      <th style={style.th}>Start Date</th>
                      <th style={style.th}>End Date</th>
                      <th style={style.th}>Subject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suspensions.map((susp, idx) => (
                      <tr key={idx}>
                        <td style={style.td}>{susp.startDate}</td>
                        <td style={style.td}>{susp.endDate}</td>
                        <td style={style.td}>{susp.subject}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default UpdateStudentForm;
