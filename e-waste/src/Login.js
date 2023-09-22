
import { useState } from 'react';
import './Login.css';

import { useNavigate } from 'react-router-dom';
import React from 'react'
import { UserAuth } from './context/AuthContext.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = UserAuth();
  const { createUser } = UserAuth();

  const handleSubmitL = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/Home')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };
  const handleSubmitR = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await createUser(name,email, password)
      navigate('/Home')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePass = (event) => {
    setPassword(event.target.value);
  };
  const navigate = useNavigate();
  return (
    <div className='ads'>
    <div className="container1">
      <input type="checkbox" id="flip" />
      <div className="cover">
        <div className="front">
          <img src="../frontImg.jpg" alt="" />
          <div className="text">
            <span className="text-1">One solution to your<br/> every E-problem</span>
            <span className="text-2">WattRebirth!!</span>
          </div>
        </div>
        <div className="back">
          <img className="backImg" src="../Light bulbs recycling flat vector illustration.jpg" alt="" />
          <div className="text">
            <span className="text-1">Welcome<br/> WattRebirth</span>
            <span className="text-2">Let's get started</span>
          </div>
        </div>
      </div>
      <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <div className="title">Login</div>
            <form action="#">
              <div className="input-boxes">
                <div className="input-box">
                  <i>
                  <FontAwesomeIcon icon={faEnvelope}  />
                  </i>
                  <input type="text" placeholder="Enter your email" required  onChange={handleEmail}/>
                </div>
                <div className="input-box">
                  <i>
                  <FontAwesomeIcon icon={faLock}/>
                  </i>
                  <input type="password" placeholder="Enter your password" required onChange={handlePass} />
                </div>
                <div className="text"><a href="#">Forgot password?</a></div>
                <div className="button input-box">
                  <input type="submit" value="Submit"  onClick={handleSubmitL}/>
                </div>
                <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Signup now</label></div>
              </div>
            </form>
          </div>
          <div className="signup-form">
            <div className="title">Signup</div>
            <form action="#">
              <div className="input-boxes">
                <div className="input-box">
                  <i>
                  <FontAwesomeIcon icon={faUser} />
                  </i>
                  <input type="text" placeholder="Enter your name" required onChange={handleName}/>
                </div>
                <div className="input-box">
                  <i>
                  <FontAwesomeIcon icon={faEnvelope}/>
                  </i>
                  <input type="text" placeholder="Enter your email" required onChange={handleEmail} />
                </div>
                <div className="input-box">
                  <i>
                  <FontAwesomeIcon icon={faLock} />
                  </i>
                  <input type="password" placeholder="Enter your password" required  onChange={handlePass}/>
                </div>
                <div className="button input-box">
                  <input type="submit" value="Submit" onClick={handleSubmitR}/>
                </div>
                <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}