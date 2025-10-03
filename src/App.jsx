import { useState } from 'react'
import "./App.css";
import logo from './assets/samplelogo.png';
import CalendarView from './components/CalendarView.jsx';
import AddStudentForm from './components/AddStudentForm.jsx';
import AddTeacherForm from './components/AddTeacherForm.jsx';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function MenuBar() {
  const navigate = useNavigate();
  return (
    <nav className="app-menu">
      <button type="button" className="menu-item" onClick={() => navigate('/')}>Calendar</button>
      <button type="button" className="menu-item" onClick={() => navigate('/addstudent')}>Add Student</button>
      <button type="button" className="menu-item" onClick={() => navigate('/addteacher')}>Add Teacher</button>
      <button type="button" className="menu-item" onClick={() => console.log('Invoice clicked')}>Invoice</button>
      <button type="button" className="menu-item" onClick={() => console.log('Login clicked')}>Login</button>
    </nav>
  );
}

function App() {
  const handleFormSubmit = async (text) => {
    console.log("Text submitted:", text);

    // TODO: send to AWS Lambda here
    
  };

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
          <Route path="/addteacher" element={<AddTeacherForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;