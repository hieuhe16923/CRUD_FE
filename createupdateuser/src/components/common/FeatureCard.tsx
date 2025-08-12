import React from 'react';
import { Card } from 'react-bootstrap';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * Reusable feature card component
 * Used to display features/services on homepage or other pages
 */
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = 'h-100 shadow-sm'
}) => {
  return (
    <Card className={className}>
      <Card.Body className="text-center">
        <div className="fs-1 mb-3">{icon}</div>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeatureCard;
