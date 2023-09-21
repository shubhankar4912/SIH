import { Button, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo1 from "./logo1.png"
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { UserAuth } from '/Users/adityabhatt/Documents/SIH/e-waste/src/context/AuthContext.js';
import register from './Register';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
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
  const navigate = useNavigate();
  return (
    <div id="header">
      <div id='contain'>
        <div style={{ display: 'flex' }}>
          <div >
            <img id="logo" alt='clogo' src={logo1} height={80} width={400} />
          </div>
          <div id="line">

          </div>
          <div className='box' id='lol' style={{ backgroundColor: '#FFFFFF' }}>
            <div id='head'>
              <h3 style={{ color: 'white' }}>Sign In</h3>
            </div>
            <Form>
              <Row>
                <Col md>
                  <div>
                    <Form.Group controlId="formEmail" id='email' onChange={(e) => setEmail(e.target.value)}>
                      <Form.Label >Email Address</Form.Label>
                      <Form.Control id='eblock' type="email" placeholder="Example@email.com" />
                    </Form.Group>

                    <Form.Group controlId="formPassword" id='password' onChange={(e) => setPassword(e.target.value)}>
                      <Form.Label >Password</Form.Label>
                      <Form.Control id='pblock' type="password" placeholder="Password" />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Row id='av'>
                <Col>
                  <Button variant='success' type='submit' id='login' onClick={handleSubmit}> Login </Button>
                </Col>

              
              <Link to="/signup" id='register'>New User?</Link>
              </Row>

            </Form>
          </div>
        </div>
      </div>

    </div>
  )
}