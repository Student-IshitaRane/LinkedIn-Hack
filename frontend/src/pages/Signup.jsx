import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    emailid: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert('Registration successful!');
        setIsLoggedIn(true); // mark as logged in
        navigate('/dashboard-home');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-indigo-400 mb-6 text-center">Create an Account</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-3 bg-gray-700 border border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-300"
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="p-3 bg-gray-700 border border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-300"
            type="email"
            name="emailid"
            placeholder="Email Address"
            value={formData.emailid}
            onChange={handleChange}
            required
          />
          <input
            className="p-3 bg-gray-700 border border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-300"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            className="p-3 bg-gray-700 border border-indigo-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Candidate">Candidate</option>
            <option value="Recruiter">Recruiter</option>
          </select>
          <button
            type="submit"
            className="mt-4 p-3 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg font-semibold text-white uppercase tracking-wide"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
