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

  // Predefined admin permissions
  const ALL_PERMISSIONS = ['manageUsers', 'viewReports', 'editSettings'];

  const [formData, setFormData] = useState({
    role: 'USER',
    fullName: '',
    email: '',
    nationalId: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    // USER-specific
    specialization: '',
    yearOfExperience: '',
    sex: '',
    age: '',
    location: '',
    // ADMIN-specific
    permissions: ALL_PERMISSIONS.reduce((acc, perm) => ({ ...acc, [perm]: false }), {}),
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData((prev) => ({
      ...prev,
      role,
      // Reset fields when switching roles
      permissions: role === 'ADMIN' ? prev.permissions : {},
      specialization: role === 'USER' ? prev.specialization : '',
      yearOfExperience: role === 'USER' ? prev.yearOfExperience : '',
      sex: role === 'USER' ? prev.sex : '',
      age: role === 'USER' ? prev.age : '',
      location: role === 'USER' ? prev.location : '',
    }));
  };

  const commonFields = [
    { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Jane Doe' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
    { label: 'National ID', name: 'nationalId', type: 'text', placeholder: '12345678901234' },
    { label: 'Phone', name: 'phone', type: 'text', placeholder: '1234567890' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '********' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: '********' },
  ];

  const userFields = [
    { label: 'Specialization', name: 'specialization', type: 'text' },
    { label: 'Years of Experience', name: 'yearOfExperience', type: 'number' },
    { label: 'Sex', name: 'sex', type: 'text' },
    { label: 'Age', name: 'age', type: 'number' },
    { label: 'Location', name: 'location', type: 'text' },
  ];

  const handlePermissionChange = (perm, value) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [perm]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match!', 'error');
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      nationalId: formData.nationalId,
      phone: formData.phone || null,
      address: formData.address || "Not available",
      ...(formData.role === 'USER' && {
        specialization: formData.specialization,
        yearOfExperience: Number(formData.yearOfExperience),
        sex: formData.sex,
        age: Number(formData.age),
        location: formData.location,
      }),
      ...(formData.role === 'ADMIN' && {
        permissions: Object.keys(formData.permissions).filter((key) => formData.permissions[key]),
      }),
    };

    dispatch(registerUser(payload))
      .unwrap()
      .then(() => addToast('Registration successful!', 'success'))
      .catch((error) => addToast(error, 'error'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <select name="role" value={formData.role} onChange={handleRoleChange}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>

      {/* Render common fields */}
      {commonFields.map((field) => (
        <Input
          key={field.name}
          {...field}
          value={formData[field.name]}
          onChange={handleChange}
          required
        />
      ))}

      {/* USER fields */}
      {formData.role === 'USER' &&
        userFields.map((field) => (
          <Input
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
            required
          />
        ))}

      {/* ADMIN permissions */}
      {formData.role === 'ADMIN' &&
        ALL_PERMISSIONS.map((perm) => (
          <label key={perm} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.permissions[perm]}
              onChange={(e) => handlePermissionChange(perm, e.target.checked)}
            />
            {perm}
          </label>
        ))}

      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default Signup;