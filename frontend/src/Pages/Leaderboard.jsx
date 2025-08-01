import React, { useState } from 'react';
import leaderboardData from '../Data/leaderboardData';

const Leaderboard = () => {
  const [showAll, setShowAll] = useState(false);

  const sortedUsers = leaderboardData.sort((a, b) => b.totalDonations - a.totalDonations);
  const usersToShow = showAll ? sortedUsers : sortedUsers.slice(0, 5);

  const getMedal = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">🏆 Top Fundraisers</h1>
        <p className="text-gray-600 mt-2">Only the best make it to the top.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {usersToShow.map((user) => (
          <div
            key={user.id}
            className={`flex items-center justify-between bg-white p-5 rounded-xl shadow-md border-l-4 ${
              user.rank === 1
                ? 'border-yellow-500'
                : user.rank === 2
                ? 'border-orange-400'
                : user.rank === 3
                ? 'border-red-400'
                : 'border-purple-400'
            } hover:scale-[1.01] transition`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{getMedal(user.rank)}</div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">Referral: {user.referralCode}</p>
              </div>
            </div>
            <div className="text-green-600 text-xl font-bold">
              ₹ {user.totalDonations.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto mt-10 text-center text-sm text-gray-500">
        Last updated: August 1, 2025
      </div>
    </div>
  );
};

export default Leaderboard;
