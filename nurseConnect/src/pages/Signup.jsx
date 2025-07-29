import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Form from '../components/ui/Form';
import { useToast } from '../contexts/ToastContext';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';

const Signup = () => {
  const { addToast } = useToast();
  const dispatch = useDispatch();
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
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        addToast('Registration successful!', 'success');
        // Optionally redirect to login or dashboard
      })
      .catch((error) => {
        addToast(error, 'error');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-primary text-primary">
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-theme bg-card"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
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

        <p className="text-center text-sm mt-4 text-accent">
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