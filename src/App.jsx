import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { UserProvider } from './context/UserContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Header from './components/Header.jsx';
import Layout from './components/Layout.jsx';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import OurTeam from './pages/OurTeam';
import OurProgram from './pages/OurProgram';
import Events from './pages/Events';
import VisitUs from './pages/VisitUs';
import Login from './pages/Login';
import Register from './pages/Register';
import MassAndEventSchedule from './pages/MassAndEventSchedule';
import Donate from './pages/Donate';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import MassAttendance from './pages/MassAttendance';
import ApplicationForMinistry from './pages/ApplicationForMinistry';
import ApplicationMinistryContacts from './pages/ApplicationMinistryContacts';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import BaptismalCertificate from './pages/BaptismalCertificate';

// Wrapper for public pages
export const PublicPageWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
    <Header />
    <Box sx={{ paddingTop: '64px' }}>{children}</Box>
  </Box>
);

const ProtectedRoute = ({ children }) => {
  // For now, just render the children without any protection
  return children;
};

const PublicRoute = ({ children }) => {
  // For now, just render the children without any redirection
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicPageWrapper><LandingPage /></PublicPageWrapper>} />
      <Route path="/about-us" element={<PublicPageWrapper><AboutUs /></PublicPageWrapper>} />
      <Route path="/our-team" element={<PublicPageWrapper><OurTeam /></PublicPageWrapper>} />
      <Route path="/our-program" element={<PublicPageWrapper><OurProgram /></PublicPageWrapper>} />
      <Route path="/events" element={<PublicPageWrapper><Events /></PublicPageWrapper>} />
      <Route path="/visit-us" element={<PublicPageWrapper><VisitUs /></PublicPageWrapper>} />
      <Route path="/schedule" element={<PublicPageWrapper><MassAndEventSchedule /></PublicPageWrapper>} />
      <Route path="/donate" element={<PublicPageWrapper><Donate /></PublicPageWrapper>} />
      
      {/* Authentication routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <PublicPageWrapper><Login /></PublicPageWrapper>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <PublicPageWrapper><Register /></PublicPageWrapper>
          </PublicRoute>
        }
      />
      
      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<ProfileEdit />} />
        <Route path="mass-attendance" element={<MassAttendance />} />
        <Route path="ministry/apply" element={<ApplicationForMinistry />} />
        <Route path="ministry/contacts" element={<ApplicationMinistryContacts />} />
        <Route path="baptismal-certificate" element={<BaptismalCertificate />} />
      </Route>

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </UserProvider>
  );
}

export default App;