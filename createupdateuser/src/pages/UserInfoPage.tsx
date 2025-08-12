import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/useAuth';
import { userService, handleUserServiceError } from '../services';
import { AppNavbar, FormTextbox, LoadingButton, AlertMessage } from '../components';
import type { User } from '../models';

const UserInfoPage: React.FC = () => {
  const { user: contextUser, isAuthenticated, updateUser, isLoading: authLoading } = useAuth();
  const [user, setUser] = useState<User>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userStatus: 1
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showErrors, setShowErrors] = useState(false); // Track if we should show validation errors
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    // Set user data from context when available
    if (contextUser) {
      setUser(contextUser);
    }
  }, [isAuthenticated, contextUser, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: name === 'userStatus' ? parseInt(value) || 1 : value
    }));
  };

  // Function to check if form has validation errors
  const hasValidationErrors = (): boolean => {
    if (!isEditing) return false;
    
    const { firstName, lastName, email, phone, userStatus } = user;
    
    // Check required fields
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return true;
    }
    
    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email || '')) {
      return true;
    }
    
    // Check phone format (if provided)
    if (phone && phone.trim()) {
      const phonePattern = /^\+?[\d\s\-()]{10,}$/;
      if (!phonePattern.test(phone)) {
        return true;
      }
    }
    
    // Check userStatus is a valid number
    if (isNaN(Number(userStatus))) {
      return true;
    }
    
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true); // Show validation errors when user attempts to submit
    
    // Check for validation errors before proceeding
    if (hasValidationErrors()) {
      setError('Please fix the validation errors before submitting.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Update user using service
      await userService.updateUser(user.username || '', user);
      
      // Update the context with new user data
      updateUser(user);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setShowErrors(false); // Reset error display state
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      const errorMessage = handleUserServiceError(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    setShowErrors(false); // Reset error display state
    // Reset to context user data
    if (contextUser) {
      setUser(contextUser);
    }
  };

  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-info-page">
      <AppNavbar />

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">User Profile</h2>
                  {!isEditing && (
                    <Button 
                      variant="light"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </Card.Header>

              <Card.Body className="p-4">
                <AlertMessage message={error} variant="danger" />
                <AlertMessage message={success} variant="success" />

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormTextbox
                        label="First Name"
                        name="firstName"
                        value={user.firstName || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        validation={isEditing ? "required" : undefined}
                        showErrors={showErrors}
                      />
                    </Col>

                    <Col md={6}>
                      <FormTextbox
                        label="Last Name"
                        name="lastName"
                        value={user.lastName || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        validation={isEditing ? "required" : undefined}
                        showErrors={showErrors}
                      />
                    </Col>
                  </Row>

                  <FormTextbox
                    label="Username"
                    name="username"
                    value={user.username || ''}
                    onChange={handleChange}
                    disabled={true}
                    className="mb-3"
                    showErrors={showErrors}
                  />
                  <div className="text-muted mb-3" style={{ marginTop: '-0.75rem' }}>
                    Username cannot be changed
                  </div>

                  <FormTextbox
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    validation={isEditing ? "email" : undefined}
                    showErrors={showErrors}
                  />

                  <FormTextbox
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={user.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    validation={isEditing ? "phone" : undefined}
                    showErrors={showErrors}
                  />

                  <FormTextbox
                    label="Status"
                    name="userStatus"
                    type="number"
                    value={user.userStatus || 1}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mb-4"
                    validation={isEditing ? "number" : undefined}
                    showErrors={showErrors}
                  />

                  {isEditing && (
                    <div className="d-flex gap-3">
                      <LoadingButton
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        loadingText="Saving..."
                      >
                        Save Changes
                      </LoadingButton>
                      <Button 
                        type="button"
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserInfoPage;
