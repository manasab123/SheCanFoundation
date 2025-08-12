import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    referralCode: ''
  });
  const [message, setMessage] = useState('');
    const [agreeTerms, setAgreeTerms]=useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password ) {
      setMessage('All fields are required.');
      return;
    }
      if (!agreeTerms) {
    setMessage("Please agree to the Terms of Use & Privacy Policy");
    return;
  }

    try {
      const res = await axios.post('https://she-can-foundation-vert.vercel.app/register', form);
      setMessage(res.data.message);
      setTimeout(() => navigate('/'), 1000); // redirect to login after 1 sec
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="mail@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
            <input
              type="text"
              name="referralCode"
              value={form.referralCode}
              onChange={handleChange}
              placeholder="XXXX2025"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-center text-red-600">{message}</p>
        )}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/" className="text-indigo-600 hover:underline font-semibold">
            Login
          </a>
        </p>
<div className="termsandconditions flex items-center space-x-2 mt-[4px]  ml-[30px] " >
  <input
    type="checkbox"
    id="terms"
    checked={agreeTerms}
    onChange={(e) => setAgreeTerms(e.target.checked)}
    className="w-3 h-3 mt-[4px] text-blue-600 border-gray-300 rounded focus:ring-blue-500"
  />
  <label
    className="text-xs font-medium text-gray-500 select-none mt-[3px] ml-0.5 cursor-pointer"
  >
    By continuing, I agree to the{' '}
    <span className="text-indigo-600 underline cursor-pointer">Terms of Use</span> &amp;{' '}
    <span className="text-indigo-600 underline cursor-pointer">Privacy Policy</span>
  </label>
</div>


      </div>
    </div>
  );
};

export default Register;
