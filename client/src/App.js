import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import NavbarMenu from './components/layout/NavbarMenu';
import About from './views/About';
import PostContextProvider from './contexts/PostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes >
            <Route exact path='/' element={<Landing />} />
            <Route path="/login" element={<Auth authRoute='login' />} />
            <Route path="/register" element={<Auth authRoute='register' />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <About/>
              </ProtectedRoute>
            } />
          </Routes >
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
    
  );
}

export default App;
