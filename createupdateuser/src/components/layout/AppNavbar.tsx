import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/useAuth';

interface AppNavbarProps {
  variant?: 'light' | 'dark';
  bg?: string;
  className?: string;
}

/**
 * Reusable navigation bar component
 * Displays different navigation items based on authentication status
 */
const AppNavbar: React.FC<AppNavbarProps> = ({ 
  variant = 'light', 
  bg = 'light', 
  className = 'shadow-sm' 
}) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg={bg} variant={variant} expand="lg" className={className}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          🐾 Pet Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/user-info">
                  Welcome, {user?.firstName || user?.username}!
                </Nav.Link>
                <Button variant="outline-primary" onClick={handleLogout} className="ms-2">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
