import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Layout from './components/layout/Layout';

// Common pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Events from './pages/Events';
import Companies from './pages/Companies';
import JobListings from './pages/JobListings';
import Courses from './pages/student/Courses';
import Appointments from './pages/student/Appointments';

// Employer pages
import EmployerDashboard from './pages/employer/Dashboard';
import JobManagement from './pages/employer/JobManagement';
import CandidateManagement from './pages/employer/CandidateManagement';
import CompanyProfile from './pages/employer/CompanyProfile';
import EmployerEvents from './pages/employer/EmployerEvents';

// Career Counselor pages
import CounselorDashboard from './pages/counselor/Dashboard';
import StudentManagement from './pages/counselor/StudentManagement';
import AppointmentManagement from './pages/counselor/AppointmentManagement';
import ConsultationManagement from './pages/counselor/ConsultationManagement';
import AvailabilityManagement from './pages/counselor/AvailabilityManagement';
import CourseCreation from './pages/counselor/CourseCreation';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemAnalytics from './pages/admin/Analytics';
import ContentManagement from './pages/admin/ContentManagement';
import SystemSettings from './pages/admin/SystemSettings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/app" element={<Layout />}>
              {/* Student routes */}
              <Route index element={<StudentDashboard />} />
              <Route path="resume" element={<ResumeBuilder />} />
              <Route path="events" element={<Events />} />
              <Route path="companies" element={<Companies />} />
              <Route path="jobs" element={<JobListings />} />
              <Route path="courses" element={<Courses />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="profile" element={<Profile />} />
              
              {/* Employer routes */}
              <Route path="employer" element={<EmployerDashboard />} />
              <Route path="employer/jobs" element={<JobManagement />} />
              <Route path="employer/candidates" element={<CandidateManagement />} />
              <Route path="employer/company" element={<CompanyProfile />} />
              <Route path="employer/events" element={<EmployerEvents />} />
              
              {/* Career Counselor routes */}
              <Route path="counselor" element={<CounselorDashboard />} />
              <Route path="counselor/students" element={<StudentManagement />} />
              <Route path="counselor/appointments" element={<AppointmentManagement />} />
              <Route path="counselor/consultations" element={<ConsultationManagement />} />
              <Route path="counselor/availability" element={<AvailabilityManagement />} />
              <Route path="counselor/courses" element={<CourseCreation />} />
              
              {/* Admin routes */}
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/users" element={<UserManagement />} />
              <Route path="admin/analytics" element={<SystemAnalytics />} />
              <Route path="admin/content" element={<ContentManagement />} />
              <Route path="admin/settings" element={<SystemSettings />} />
            </Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;