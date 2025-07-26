import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Form from '../components/ui/Form';
import { useTheme } from '../contexts/ThemeContext';

const Signup = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const inputs = [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      placeholder: 'Jane Doe',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'you@example.com',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: '********',
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      placeholder: '********',
    },
  ];
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Signup Submitted:', formData);
    // Add signup logic (e.g., API call) here
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-2xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Create an Account
        </h2>

        {inputs.map((input) => (
          <Input
            key={input.name}
            label={input.label}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            value={formData[input.name]}
            onChange={handleChange}
            required
          />
        ))}

        <div className="mt-6">
          <Button type="submit" fullWidth>
            Sign Up
          </Button>
        </div>

        <p className={`text-center text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </Form>
    </div>
  );
};

export default Signup;