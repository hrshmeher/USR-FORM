import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setIsSuccess(true);
      // Reset form after successful submission
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Reset success state when user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
        <p className="text-gray-600 mb-6">Thank you for creating an account.</p>
        <Button 
          onClick={() => setIsSuccess(false)}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Register Another Account
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="flex items-center justify-center mb-8">
        <User size={40} className="text-blue-600" />
      </div>
      
      <Input
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        placeholder="Enter your username"
        icon={<User className="text-gray-400" size={20} />}
      />
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        icon={<Mail className="text-gray-400" size={20} />}
      />
      
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter your password"
        icon={<Lock className="text-gray-400" size={20} />}
      />
      
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        icon={<Lock className="text-gray-400" size={20} />}
      />
      
      <Button type="submit" isLoading={isLoading}>
        Register
      </Button>
    </form>
  );
};