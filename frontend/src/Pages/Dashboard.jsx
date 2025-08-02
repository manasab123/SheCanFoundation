import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/dashboard', {
      headers: { 'auth-token': token }
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.error(err);
      alert('Session expired. Please login again.');
      navigate('/login');
    });
  }, [navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  // Dummy referral history
  const referralHistory = [
    { name: 'Ayesha K.', amount: 2500, date: '28 July 2025' },
    { name: 'Rahul D.', amount: 1500, date: '30 July 2025' },
    { name: 'Nikita V.', amount: 3500, date: '1 Aug 2025' },
  ];

  // Reward badge based on donation
  const getBadge = () => {
    const d = user.donations;
    if (d >= 10000) return { label: "🥇 Gold Badge", color: "green", text: "Raised ₹10,000+" };
    if (d >= 5000) return { label: "🏅 Silver Badge", color: "yellow", text: "Raised ₹5,000+" };
    if (d >= 1000) return { label: "🎉 Bronze Badge", color: "purple", text: "Raised ₹1,000+" };
    return null;
  };

  const badge = getBadge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Hello, <span className="text-purple-700">{user.name}</span> 👋
        </h1>
        <p className="text-lg text-gray-600">
          Welcome back to your fundraising dashboard.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-md">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Your Referral Code</h2>
          <div className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2">
            <p className="text-lg font-mono text-blue-700">{user.referralCode}</p>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-600 hover:text-blue-800 transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-md">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Total Donations Raised</h2>
          <p className="text-2xl font-bold text-green-600 text-center">
            ₹ {user.donations.toLocaleString()}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-md">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Your Rank</h2>
          <p className="text-2xl font-bold text-purple-600 text-center">#12</p>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="max-w-5xl mx-auto mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rewards</h2>
        {badge ? (
          <div className={`bg-white p-4 rounded-lg shadow-lg text-center border-t-4 border-${badge.color}-500`}>
            <h3 className={`text-lg font-bold text-${badge.color}-700`}>{badge.label}</h3>
            <p className="text-sm text-gray-600 mt-2">{badge.text}</p>
          </div>
        ) : (
          <div className="text-sm text-gray-600">Start sharing your referral code to earn rewards!</div>
        )}
      </div>

      {/* Referral History (Dummy) */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Referral History</h2>
        <div className="space-y-4">
          {referralHistory.map((ref, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{ref.name}</p>
                <p className="text-sm text-gray-500">{ref.date}</p>
              </div>
              <div className="text-green-600 font-semibold">₹ {ref.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
        <Link to="/leaderboard">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700 transition">
            View Leaderboard
          </button>
        </Link>
        <p className="text-gray-600 text-sm text-center sm:text-right">
          Share your referral code and earn exciting rewards as donations increase.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
