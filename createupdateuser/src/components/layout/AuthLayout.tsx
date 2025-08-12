import React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  maxWidth?: 'sm' | 'md' | 'lg';
  showBackLink?: boolean;
  backLinkText?: string;
}

/**
 * Reusable layout component for authentication pages (login, signup)
 * Provides consistent styling and layout structure
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  maxWidth = 'md',
  showBackLink = true,
  backLinkText = '← Back to Home'
}) => {
  const getColSize = () => {
    switch (maxWidth) {
      case 'sm': return { md: 6, lg: 4 };
      case 'md': return { md: 6, lg: 5 };
      case 'lg': return { md: 8, lg: 6 };
      default: return { md: 6, lg: 5 };
    }
  };

  return (
    <div className="auth-page bg-gradient-primary min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col {...getColSize()}>
            {showBackLink && (
              <div className="text-center mb-4">
                <Link to="/" className="text-white text-decoration-none">
                  {backLinkText}
                </Link>
                <h1 className="text-white mt-2">🐾 Pet Store</h1>
              </div>
            )}

            <Card className="shadow-lg">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2>{title}</h2>
                  <p className="text-muted">{subtitle}</p>
                </div>

                {children}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthLayout;
