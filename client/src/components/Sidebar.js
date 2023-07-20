import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import React from 'react'

export default function Sidebar() {
  return (
   
     <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="">
          <Container fluid>
           
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Profile</Nav.Link>
                  <Nav.Link href="#action2">Courses</Nav.Link>
                  
                    
                </Nav>
                
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
          
        </Navbar>
        
      ))}
    </>
 
   
  )
}


