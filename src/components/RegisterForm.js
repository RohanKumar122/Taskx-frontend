import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const backendapi = process.env.REACT_APP_BACKEND_API;

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`${backendapi}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username and password as JSON
      });

      if (response.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to login page
      } else {
        const errorData = await response.json();
        alert(errorData.detail || 'Registration failed.'); // Show error message
      }
    } catch (error) {
      alert('Error connecting to the server.');
    }
    setLoading(false); 
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleRegister}
        disabled={loading} 
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
};

export default RegisterForm;
