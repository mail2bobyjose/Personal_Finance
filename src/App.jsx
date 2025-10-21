import { useState } from 'react';
import './App.css';
import logo from './assets/samplelogo.png';
import CalendarView from './components/CalendarView.jsx';
import AddStudentForm from './components/AddStudentForm.jsx';
import AddTeacherForm from './components/AddTeacherForm.jsx';
import UpdateStudentForm from './components/UpdateStudentForm.jsx';
import Classes from './components/Classes.jsx';

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
      <div className="dropdown-wrapper">
        <div className="menu-item">Invoicing</div>
        <div className="submenu">
          <button className="submenu-item" onClick={() => navigate('/studentinvoice')}>
            Student Invoicing
          </button>
          <button className="submenu-item" onClick={() => navigate('/teacherinvoice')}>
            Teacher Invoicing
          </button>
        </div>
      </div>

      <button className="menu-item" onClick={() => navigate('/class')}>Classes</button>
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
           <Route path="/updatestudent" element={<UpdateStudentForm />} />
          <Route path="/addteacher" element={<AddTeacherForm />} />
          <Route path="/updateteacher" element={<div> Yet to build (Coming Soon)</div>} />
          <Route path="/studentinvoice" element={<div>Yet to build (Coming Soon)</div>} />
          <Route path="/teacherinvoice" element={<div>Yet to build (Coming Soon)</div>} />
          <Route path="/class" element={<Classes/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
