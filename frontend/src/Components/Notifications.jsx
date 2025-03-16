// src/pages/Notification.jsx

import React from 'react';

const notifications = [
  {
    id: 1,
    title: 'Account Balance Low',
    description:
      'Your account balance is below $50. Please deposit funds to avoid account fees.',
    type: 'warning',
    date: '2025-01-12',
  },
  {
    id: 2,
    title: 'Investment Portfolio Update',
    description: 'Your stocks have shown a 5% increase today.',
    type: 'success',
    date: '2025-01-10',
  },
  {
    id: 3,
    title: 'Debt Repayment Due',
    description:
      'Your monthly loan repayment of $500 is due tomorrow. Please ensure timely payment.',
    type: 'warning',
    date: '2025-01-11',
  },
  {
    id: 4,
    title: 'New Transaction',
    description: 'A payment of $250 was made from your account.',
    type: 'info',
    date: '2025-01-09',
  },
];

const Notifications = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 ${
              notification.type === 'success'
                ? 'border-l-4 border-green-600'
                : notification.type === 'warning'
                ? 'border-l-4 border-yellow-600'
                : notification.type === 'info'
                ? 'border-l-4 border-blue-600'
                : ''
            }`}
          >
            <h3 className="text-xl font-semibold text-indigo-600">{notification.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{notification.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              <span>{notification.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
