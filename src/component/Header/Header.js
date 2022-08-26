import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import './Header.css'
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    return (
        <Navbar bg="white" expand="lg">
            <Container>
                <Navbar.Brand href="/home">
                    <img
                        src="/logo-symbol.png"
                        className="d-inline-block align-top"
                        alt="Express Hair Saloon logo"
                    />
                    <h3 className='logo-name'>Express Hair Salon</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#services">Services</Nav.Link>
                        <Nav.Link href="/shop">Shop</Nav.Link>
                        <Button variant="dark" className="booknow-btn" onClick={() => navigate("/booking/Haircut")}>Book now</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;