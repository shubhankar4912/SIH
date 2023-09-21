import './Register.css';
import { Button, Form, Row, Col } from 'react-bootstrap'
import { UserAuth } from './context/AuthContext';
import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePass = (event) => {
    setPass(event.target.value);
  };

  const signUpUser= async() =>{
    
    
    try{
      await createUser(name,email, pass);
      navigate('/Home')
    }
    catch(err){
      console.log(err);
    }
    
  }

  

  return (
    <header className="App-header">
      <div>
        <div id='lols' style={{ backgroundColor: '#FFFFFF' }}>
        <div id='head'>
  <h3 style={{ color: 'white'}} >Register</h3> {/* Added text-center class */}
</div>

          

<Form>
  <Row>
  <Col > {/* Added mx-auto and text-center classes */}
  <div>
    <Form.Group id='name' className='form-group'>
      <Form.Label>Name</Form.Label>
      <Form.Control id='nblock' type="text" placeholder="Name" onChange={handleName} />
    </Form.Group>

    <Form.Group id='email' className='form-group'>
      <Form.Label>Email Address</Form.Label>
      <Form.Control id='eblock' type="email" placeholder="Example@email.com" onChange={handleEmail} />
    </Form.Group>

    <Form.Group id='password' className='form-group'>
      <Form.Label>Password</Form.Label>
      <Form.Control id='pblock' type="password" placeholder="Password" onChange={handlePass} />
    </Form.Group>
  </div>
</Col>
  </Row>
  <Row>
    <Col > {/* Added text-center class */}
      <Button variant='success' type='button' id='registerb' style={{ backgroundColor: '#008080', color: 'white' }} onClick={signUpUser}> Register </Button> {/* Changed background color to tea green */}
    </Col>
  </Row>
</Form>



        </div>
      </div>
      <div id='bottom'></div>
    </header>
  )
}
