import React, { useState } from 'react';

// Sample statuses – you can modify these
const classStatuses = ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'];

const Classes = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    student: '',
    teacher: '',
    subject: '',
    classType: '',
    status: '',
  });

  const [results, setResults] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  // Simulate result fetching
  const handleSearch = (e) => {
    e.preventDefault();

    // Simulated data
    const simulatedResults = [
      {
        classDate: '2025-10-18',
        student: 'Alice Smith',
        teacher: 'Mr. Brown',
        subject: 'Math',
        classType: 'Online',
        classStatus: 'Scheduled',
      },
      {
        classDate: '2025-10-19',
        student: 'Bob Johnson',
        teacher: 'Ms. Green',
        subject: 'Science',
        classType: 'Offline',
        classStatus: 'Completed',
      },
    ];

    setResults(simulatedResults);
    setSelectedRows([]);
    setUpdatedStatuses({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows((prev) => prev.filter((i) => i !== index));
    } else {
      setSelectedRows((prev) => [...prev, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === results.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(results.map((_, index) => index));
    }
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
    alert('Statuses updated successfully!');
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
        <div>
          <label>Student</label><br />
          <input type="text" name="student" value={filters.student} onChange={handleChange} />
        </div>
        <div>
          <label>Teacher</label><br />
          <input type="text" name="teacher" value={filters.teacher} onChange={handleChange} />
        </div>
        <div>
          <label>Subject</label><br />
          <input type="text" name="subject" value={filters.subject} onChange={handleChange} />
        </div>
        <div>
          <label>Class Type</label><br />
          <input type="text" name="classType" value={filters.classType} onChange={handleChange} />
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

      {results.length > 0 && (
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
      )}
    </div>
  );
};

export default Classes;
