import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Form from '../components/ui/Form';
import Loading from '../components/Loading';
import { loginUser } from '../redux/actions/userActions';
import { useToast } from '../contexts/ToastContext';

const Login = () => {

  const { addToast } = useToast();
  const { loading, error, user } = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState();

  useEffect(() => {
    if (error) {
      addToast(error, 'error');
    } else if (user && !loading) {
      addToast('Login successful!', 'success');

      // navigate('/dashboard');
    }
  }, [user, error, loading, addToast]);

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  if (loading) return <Loading message="Logging in please wait..." />;
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 bg-primary text-primary`}>
      <Form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        {[
          { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
          { label: 'Password', name: 'password', type: 'password', placeholder: '********' }
        ].map((input) =>
          input.name === "password" ? (
            <div key={input.name} className="relative">
              <Input
                {...input}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                required
                className="pr-0"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 top-[67%] transform -translate-y-1/2"
                variant="icon"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </Button>
            </div>
          ) : (
            <Input
              key={input.name}
              {...input}
              value={credentials[input.name]}
              onChange={handleChange}
              required
            />
          )
        )}


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