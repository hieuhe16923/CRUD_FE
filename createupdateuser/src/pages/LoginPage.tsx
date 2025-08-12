import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useAuth } from '../contexts/useAuth';
import { userService, handleUserServiceError } from '../services';
import { AuthLayout, FormTextbox, LoadingButton, AlertMessage } from '../components';
import type { UserLoginRequest } from '../models';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<UserLoginRequest>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false); // Track if we should show validation errors
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to check if form has validation errors
  const hasValidationErrors = (): boolean => {
    const { username, password } = formData;
    return !username?.trim() || !password?.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true); // Show validation errors when user attempts to submit
    
    // Check for validation errors before proceeding
    if (hasValidationErrors()) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const token = await userService.loginUser(formData);
      await login(formData.username, token);
      navigate('/user-info');
    } catch (error) {
      const errorMessage = handleUserServiceError(error);
      setError(`Login failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to your account"
      maxWidth="md"
    >
      <AlertMessage message={error} variant="danger" />

      <Form onSubmit={handleSubmit}>
        <FormTextbox
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          validation="required"
          showErrors={showErrors}
        />

        <FormTextbox
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
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
          loadingText="Signing In..."
        >
          Sign In
        </LoadingButton>
      </Form>

      <div className="text-center">
        <p className="mb-0">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
