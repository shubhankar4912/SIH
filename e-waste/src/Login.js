import { Button, Form, Row, Col } from 'react-bootstrap'
import './Login.css';
import { Link } from 'react-router-dom';
import logo1 from "./logo1.png"
import { useNavigate } from 'react-router-dom';
export default function Register() {
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
                    <Form.Group controlId="formEmail" id='email' >
                      <Form.Label >Email Address</Form.Label>
                      <Form.Control id='eblock' type="email" placeholder="Example@email.com" />
                    </Form.Group>

                    <Form.Group controlId="formPassword" id='password'>
                      <Form.Label >Password</Form.Label>
                      <Form.Control id='pblock' type="password" placeholder="Password" />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant='success' type='submit' id='login' onClick={() => navigate("/home")}> Login </Button>
                </Col>

              </Row>
              <Link to="/register" id='register'>New User?</Link>

            </Form>
          </div>
        </div>
      </div>

    </div>
  )
}