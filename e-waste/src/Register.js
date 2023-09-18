import './Register.css';
import { Button, Alert, Form, Card, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
export default function Register(){
  const navigate=useNavigate();
    return(
        <header className="App-header">
          

        <div>
        <div id='lols' style={{backgroundColor: '#FFFFFF'}}>
          <div id='head'>
            <h3 style={{color:'white'}}>Register</h3>
          </div>
          <Form>
            <Row>
            <Col md>
            <div>

            <Form.Group controlId="formBasic Text" id='name' >
              <Form.Label >Name</Form.Label>
              <Form.Control id='nblock' type="text" placeholder= "Name" />
            </Form.Group>

            <Form.Group controlId="formEmail" id='email' >
              <Form.Label >Email Address</Form.Label>
              <Form.Control id='eblock' type="email" placeholder= "Example@email.com" />
            </Form.Group>

            <Form.Group controlId="formPassword" id ='password'>
              <Form.Label >Password</Form.Label>
              <Form.Control id='pblock' type="password" placeholder="Password" />
            </Form.Group>
            </div>
            </Col>
            </Row>
            <Row>
            <Col>
            <Button variant='success' type='submit' id ='registerb' style={{backgroundColor: 'green',color:'white'}} onClick={()=>navigate("/home")}> Register </Button>
            </Col>
              
            </Row>
            

          </Form>
          </div>
          </div>
          <div>
          
          </div>

          <div id='bottom'></div>
        </header>
    )
}