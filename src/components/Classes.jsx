import React, { useState } from 'react';

const classStatuses = ['Proposed', 'Scheduled', 'Cancelled', 'Completed'];

const Classes = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    student: '',
    studentId: '',        // <-- added
    teacher: '',
    subject: '',
    classType: '',
    status: '',
  });

  const [results, setResults] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [updatedStatuses, setUpdatedStatuses] = useState({});
  const [searchResults, setSearchResults] = useState([]); // <-- added

  const handleSearchChange = async (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'student' ? { studentId: '' } : {}), // clear studentId if typing
    }));

    // Student search API call
    if (name === 'student' && value.length >= 3) {
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

        if (response.ok && data.results && data.results.length > 0) {
          setSearchResults(data.results);
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

  const handleStudentSelect = (student) => {
    setFilters((prev) => ({
      ...prev,
      student: `${student.studentFirstName} ${student.studentLastName}`,
      studentId: student.studentId, // IMPORTANT
    }));
    setSearchResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const {
      startDate,
      endDate,
      studentId,
      teacher,
      subject,
      classType,
      status,
    } = filters;

    if (!startDate) {
      alert("Please enter a start date");
      return;
    }

    try {
      const url = new URL(
        "https://615z8src85.execute-api.ap-southeast-2.amazonaws.com/default/getclass"
      );

      if (!endDate) {
        url.searchParams.append("date", startDate);
      } else {
        url.searchParams.append("startDate", startDate);
        url.searchParams.append("endDate", endDate);
      }

      // Send studentId if exists (NOT student name)
      if (studentId) url.searchParams.append("studentId", studentId);
      if (teacher) url.searchParams.append("teacher", teacher);
      if (subject) url.searchParams.append("subject", subject);
      if (classType) url.searchParams.append("classType", classType);
      if (status) url.searchParams.append("status", status);

      const response = await fetch(url.toString());
      const data = await response.json();
      const parsed = typeof data.body === "string" ? JSON.parse(data.body) : data;

      const mappedResults = (parsed.items || []).map((item) => ({
        classDate: item.classdateist,
        student: `${item.studentFirstName} ${item.studentLastName}`,
        teacher: `${item.classteacherfirstname} ${item.classteacherlastname}`,
        subject: item.classsubject,
        classType: item.classtype,
        classStatus: item.classstatus,
      }));

      setResults(mappedResults);
      setSelectedRows([]);
      setUpdatedStatuses({});
    } catch (error) {
      console.error("Failed to fetch class data:", error);
      alert("Failed to fetch class data. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === results.length ? [] : results.map((_, i) => i));
  };

  const handleStatusChange = (idx, newStatus) => {
    setUpdatedStatuses((prev) => ({ ...prev, [idx]: newStatus }));
  };

  const handleSaveChanges = () => {
    const updated = [...results];
    Object.entries(updatedStatuses).forEach(([idx, newStatus]) => {
      updated[idx].classStatus = newStatus;
    });
    setResults(updated);
    setUpdatedStatuses({});
    alert("Statuses updated successfully!");
  };

  const tdStyle = { padding: '8px', border: '1px solid #ccc', textAlign: 'left' };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Search Classes</h2>

      <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <label>Start Date</label><br />
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        </div>

        <div>
          <label>End Date</label><br />
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
        </div>

        <div style={{ position: 'relative' }}>
          <label>Student</label><br />
          <input
            type="text"
            name="student"
            value={filters.student}
            onChange={handleSearchChange}
            autoComplete="off"
          />

          {/* Autocomplete dropdown */}
          {searchResults.length > 0 && (
            <ul style={{
              position: 'absolute',
              top: '55px',
              left: 0,
              right: 0,
              background: '#fff',
              border: '1px solid #ccc',
              listStyle: 'none',
              margin: 0,
              padding: '0.5rem'
            }}>
              {searchResults.map((student) => (
                <li
                  key={student.studentId}
                  onClick={() => handleStudentSelect(student)}
                  style={{ padding: '0.5rem', cursor: 'pointer' }}
                >
                  {student.studentFirstName} {student.studentLastName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label>Teacher</label><br />
          <input type="text" name="teacher" value={filters.teacher} onChange={handleChange} />
        </div>

        <div>
          <label>Subject</label><br />
          <select name="subject" value={filters.subject} onChange={handleChange}>
            <option value="">All</option>
            <option value="English">English</option>
            <option value="Maths">Maths</option>
            <option value="Drawing">Drawing</option>
          </select>
        </div>

        <div>
          <label>Class Type</label><br />
          <select name="classType" value={filters.classType} onChange={handleChange}>
            <option value="">All</option>
            <option value="demo">demo</option>
            <option value="regular">regular</option>
            <option value="adhoc">adhoc</option>
          </select>
        </div>

        <div>
          <label>Status</label><br />
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">All</option>
            {classStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div style={{ alignSelf: 'flex-end' }}>
          <button type="submit">Search</button>
        </div>
      </form>

      {results.length > 0 ? (
        <div style={{ marginTop: '2rem' }}>
          <h3>Class Results</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === results.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={tdStyle}>Date</th>
                <th style={tdStyle}>Student</th>
                <th style={tdStyle}>Teacher</th>
                <th style={tdStyle}>Subject</th>
                <th style={tdStyle}>Class Type</th>
                <th style={tdStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((cls, idx) => (
                <tr key={idx}>
                  <td style={tdStyle}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(idx)}
                      onChange={() => handleSelectRow(idx)}
                    />
                  </td>
                  <td style={tdStyle}>{cls.classDate}</td>
                  <td style={tdStyle}>{cls.student}</td>
                  <td style={tdStyle}>{cls.teacher}</td>
                  <td style={tdStyle}>{cls.subject}</td>
                  <td style={tdStyle}>{cls.classType}</td>
                  <td style={tdStyle}>
                    {selectedRows.includes(idx) ? (
                      <select
                        value={updatedStatuses[idx] ?? cls.classStatus}
                        onChange={(e) => handleStatusChange(idx, e.target.value)}
                      >
                        {classStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      cls.classStatus
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedRows.length > 0 && (
            <button
              onClick={handleSaveChanges}
              style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
            >
              Save Changes
            </button>
          )}
        </div>
      ) : (
        <p style={{ marginTop: '2rem' }}>No search result matching the conditions</p>
      )}
    </div>
  );
};

export default Classes;
