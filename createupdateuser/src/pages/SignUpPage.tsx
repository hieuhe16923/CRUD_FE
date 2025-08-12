import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { userService, handleUserServiceError } from '../services';
import { AuthLayout, FormTextbox, LoadingButton, AlertMessage } from '../components';
import type { User } from '../models';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    userStatus: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showErrors, setShowErrors] = useState(false); // Track if we should show validation errors
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to check if form has validation errors
  const hasValidationErrors = (): boolean => {
    const { firstName, lastName, username, email, phone, password } = formData;
    
    // Check required fields
    if (!firstName?.trim() || !lastName?.trim() || !username?.trim() || !email?.trim() || !password?.trim()) {
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
      await userService.createUser(formData);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = handleUserServiceError(error);
      setError(`Failed to create account: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our pet store community"
      maxWidth="lg"
    >
      <AlertMessage message={error} variant="danger" />
      <AlertMessage message={success} variant="success" />

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormTextbox
              label="First Name"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              placeholder="First name"
              validation="required"
              showErrors={showErrors}
            />
          </Col>

          <Col md={6}>
            <FormTextbox
              label="Last Name"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              placeholder="Last name"
              validation="required"
              showErrors={showErrors}
            />
          </Col>
        </Row>

        <FormTextbox
          label="Username"
          name="username"
          value={formData.username || ''}
          onChange={handleChange}
          placeholder="Choose a username"
          validation="required"
          showErrors={showErrors}
        />

        <FormTextbox
          label="Email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={handleChange}
          placeholder="your@email.com"
          validation="email"
          showErrors={showErrors}
        />

        <FormTextbox
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="Phone number"
          validation="phone"
          showErrors={showErrors}
        />

        <FormTextbox
          label="Password"
          name="password"
          type="password"
          value={formData.password || ''}
          onChange={handleChange}
          placeholder="Create a password"
          className="mb-4"
          validation="required"
          showErrors={showErrors}
        />

        <LoadingButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-100 mb-3"
          loading={isLoading}
          loadingText="Creating Account..."
        >
          Create Account
        </LoadingButton>
      </Form>

      <div className="text-center">
        <p className="mb-0">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
