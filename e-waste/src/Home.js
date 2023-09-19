import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import './Home.css'
import UserIcon from './Useric';
function Home() {
    return (

       

        <div className='page-container'>

            <div className='content-wrap'>
                <div id="Nav">


                    <Navbar bg="light" expand="lg" varient="dark" className="bg-body-tertiary" color='black'>
                        <Container>
                            <Navbar.Brand href="#home">WattRebirth</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home">Home</Nav.Link>
                                    <Nav.Link href="#link">Link</Nav.Link>
                                    <NavDropdown title="Cities" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Delhi</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Dehradun
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Chandigarh</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Separated link
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder="Search here..."
                                        className="mr-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success" id="searchb">
                                        <FontAwesomeIcon icon={faSearch} /> 
                                    </Button>
                                </Form>
                                <div className="d-flex align-items-center mr-50"> {/* Add a margin to this div */}
                  {/* UserIcon component */}
                  <UserIcon />
                </div>


                            



                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
            <div id='mid'>

            </div>
            <div id='foot'>
                <div >
                    <Row>
                        <Col md>
                            <Row><a href="#" style={{ color: 'white' }}>About Us</a></Row>
                            <Row><a href="#" style={{ color: 'white' }}>Our Services</a></Row>
                            <Row><a href="#" style={{ color: 'white' }}>Register complains</a></Row>
                        </Col>
                        <Col md>
                            <Row><a href="#" style={{ color: 'white' }}>FAQ</a></Row>
                            <Row><a href="#" style={{ color: 'white' }}>Order Status</a></Row>
                            <Row><a href="#" style={{ color: 'white' }}>Returns</a></Row>

                        </Col>
                        <Col md>
                            <div id='Icons'>
                                <h4 style={{ textAlign: 'center' }, { color: 'white' }}>Follow Us</h4>
                                <a href="#" style={{ color: 'white' }}><FontAwesomeIcon icon={faFacebook} /></a>
                                <a href="#" style={{ color: 'white' }}><FontAwesomeIcon icon={faInstagram} id='insta' /></a>
                                <a href="#" style={{ color: 'white' }}><FontAwesomeIcon icon={faTwitter} /></a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

    )
}

export default Home;