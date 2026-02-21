// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";

import CalendarView from "./components/CalendarView.jsx";
import AddStudentForm from "./components/AddStudentForm.jsx";
import UpdateStudentForm from "./components/UpdateStudentForm.jsx";
import AddTeacherForm from "./components/AddTeacherForm.jsx";
import Classes from "./components/Classes.jsx";

import logo from "./assets/samplelogo.png";
import "./App.css";

/* ------------------ MENU BAR ------------------ */
function MenuBar({ signOut, user }) {
  const navigate = useNavigate();

  return (
    <nav className="app-menu">
      <button className="menu-item" onClick={() => navigate("/")}>
        Calendar
      </button>

      {/* Students */}
      <div className="dropdown-wrapper">
        <div className="menu-item">Students</div>
        <div className="submenu">
          <button
            className="submenu-item"
            onClick={() => navigate("/addstudent")}
          >
            Add a new student
          </button>
          <button
            className="submenu-item"
            onClick={() => navigate("/updatestudent")}
          >
            Update Student
          </button>
        </div>
      </div>

      {/* Teachers */}
      <div className="dropdown-wrapper">
        <div className="menu-item">Teachers</div>
        <div className="submenu">
          <button
            className="submenu-item"
            onClick={() => navigate("/addteacher")}
          >
            Add a new teacher
          </button>
          <button
            className="submenu-item"
            onClick={() => navigate("/updateteacher")}
          >
            Update Teacher
          </button>
        </div>
      </div>

      {/* Invoicing */}
      <div className="dropdown-wrapper">
        <div className="menu-item">Invoicing</div>
        <div className="submenu">
          <button
            className="submenu-item"
            onClick={() => navigate("/studentinvoice")}
          >
            Student Invoicing
          </button>
          <button
            className="submenu-item"
            onClick={() => navigate("/teacherinvoice")}
          >
            Teacher Invoicing
          </button>
        </div>
      </div>

      <button className="menu-item" onClick={() => navigate("/class")}>
        Classes
      </button>

      {/* Right side user + signout */}
      <div style={{ marginLeft: "auto", paddingLeft: "1rem" }}>
        <span style={{ marginRight: "1rem" }}>
          Hello, {user?.username}
        </span>
        <button className="menu-item" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

/* ------------------ APP ------------------ */
function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <BrowserRouter>
          <div className="app-container">
            <header className="app-header">
              <img
                src={logo}
                alt="Company Logo"
                className="app-logo"
              />
            </header>

            <MenuBar signOut={signOut} user={user} />

            <Routes>
              <Route path="/" element={<CalendarView />} />
              <Route path="/addstudent" element={<AddStudentForm />} />
              <Route path="/updatestudent" element={<UpdateStudentForm />} />
              <Route path="/addteacher" element={<AddTeacherForm />} />
              <Route
                path="/updateteacher"
                element={<div>Yet to build (Coming Soon)</div>}
              />
              <Route
                path="/studentinvoice"
                element={<div>Yet to build (Coming Soon)</div>}
              />
              <Route
                path="/teacherinvoice"
                element={<div>Yet to build (Coming Soon)</div>}
              />
              <Route path="/class" element={<Classes />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </Authenticator>
  );
}

export default App;