import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgClass?: string;
  textClass?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Reusable page header component
 * Displays page title, subtitle, and optional action buttons
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  bgClass = 'bg-gradient-primary',
  textClass = 'text-white',
  className = 'py-5',
  children
}) => {
  return (
    <div className={`${bgClass} ${textClass} ${className}`}>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1 className="display-4 fw-bold mb-2">{title}</h1>
            {subtitle && <p className="lead mb-0">{subtitle}</p>}
          </Col>
          {children && (
            <Col xs="auto">
              {children}
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PageHeader;
