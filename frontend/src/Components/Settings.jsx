// src/pages/Settings.jsx

import React, { useState } from 'react';

const Settings = () => {
  // State for form handling (e.g., user preferences, password)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    // You can handle saving or updating settings here
    alert('Settings Saved');
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Account Settings</h1>

      <form onSubmit={handleSave}>
        {/* Username Section */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-lg font-medium text-indigo-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Email Section */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-indigo-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Password Section */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-indigo-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a new password"
            required
          />
        </div>

        {/* Notification Preference */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="notification"
            className="form-checkbox h-5 w-5 text-indigo-600"
            checked={notification}
            onChange={(e) => setNotification(e.target.checked)}
          />
          <label htmlFor="notification" className="ml-3 text-lg font-medium text-indigo-700">
            Enable Notifications
          </label>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
