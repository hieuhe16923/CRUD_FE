import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/useAuth';
import { AppNavbar, FeatureCard, PageHeader } from '../components';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="homepage">
      <AppNavbar />

      <PageHeader
        title="Welcome to Pet Store"
        subtitle="Your one-stop destination for all your pet needs!"
      >
        {!isAuthenticated ? (
          <div className="d-flex gap-3">
            <Link to="/login" className="btn btn-light btn-lg">
              Get Started
            </Link>
            <Link to="/signup" className="btn btn-outline-light btn-lg">
              Sign Up
            </Link>
          </div>
        ) : (
          <Link to="/user-info" className="btn btn-light btn-lg">
            View Profile
          </Link>
        )}
      </PageHeader>

      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <FeatureCard
              icon="🐕"
              title="Find Pets"
              description="Browse through our collection of adorable pets looking for homes."
            />
          </Col>
          <Col md={4}>
            <FeatureCard
              icon="🛒"
              title="Easy Orders"
              description="Simple and secure ordering process for all your pet supplies."
            />
          </Col>
          <Col md={4}>
            <FeatureCard
              icon="👤"
              title="Manage Profile"
              description="Keep your information up to date and track your orders."
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
