import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';

import Home from './Home';

function App() {
  return (
    <div>
      <Router> {/* Wrap your application with a Router */}
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<Login />} />

            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
