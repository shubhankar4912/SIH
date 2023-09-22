import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Price from './Price';
import Home from './Home';
function App() {
  return (
    <div>
      <Router> {/* Wrap your application with a Router */}
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<Login />} />

            <Route
              path='/Login'
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
             <Route path='/Home' element={<Home/>}></Route>
            <Route path='/Price' element={<Price/>}></Route>
          </Routes>
        </AuthContextProvider>
        
      </Router>
    </div>
  );
}

export default App;
