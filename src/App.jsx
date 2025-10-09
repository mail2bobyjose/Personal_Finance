import { useState } from 'react';
import './App.css';
import logo from './assets/samplelogo.png';
import CalendarView from './components/CalendarView.jsx';
import AddStudentForm from './components/AddStudentForm.jsx';
import AddTeacherForm from './components/AddTeacherForm.jsx';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function MenuBar() {
  const navigate = useNavigate();

  return (
    <nav className="app-menu">
      <button className="menu-item" onClick={() => navigate('/')}>Calendar</button>

      {/* Students dropdown */}
      <div className="dropdown-wrapper">
        <div className="menu-item">Students</div>
        <div className="submenu">
          <button className="submenu-item" onClick={() => navigate('/addstudent')}>
            Add a new student
          </button>
          <button className="submenu-item" onClick={() => navigate('/updatestudent')}>
            Update Student
          </button>
        </div>
      </div>

      {/* Teachers dropdown */}
      <div className="dropdown-wrapper">
        <div className="menu-item">Teachers</div>
        <div className="submenu">
          <button className="submenu-item" onClick={() => navigate('/addteacher')}>
            Add a new teacher
          </button>
          <button className="submenu-item" onClick={() => navigate('/updateteacher')}>
            Update Teacher
          </button>
        </div>
      </div>

      <button className="menu-item" onClick={() => console.log('Invoice clicked')}>Invoice</button>
      <button className="menu-item" onClick={() => console.log('Login clicked')}>Login</button>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <img src={logo} alt="Company Logo" className="app-logo" />
        </header>

        <MenuBar />

        <Routes>
          <Route path="/" element={<CalendarView />} />
          <Route path="/addstudent" element={<AddStudentForm />} />
          <Route path="/updatestudent" element={<div>Update Student Page (Coming Soon)</div>} />
          <Route path="/addteacher" element={<AddTeacherForm />} />
          <Route path="/updateteacher" element={<div>Update Teacher Page (Coming Soon)</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
