import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Form from '../components/ui/Form';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submitted:', credentials);
    // Add your login logic here
  };

  return (
<div className={`min-h-screen flex items-center justify-center px-4 bg-primary text-primary`}>
      <Form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        {[
          { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
          { label: 'Password', name: 'password', type: 'password', placeholder: '********' }
        ].map((input) => (
          <Input
            key={input.name}
            {...input}
            value={credentials[input.name]}
            onChange={handleChange}
            required
          />
        ))}

        <div className="mt-6">
          <Button type="submit" fullWidth>
            Login
          </Button>
        </div>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </Form>
    </div>
  );
};

export default Login;
