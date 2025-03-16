// src/pages/Profile.jsx

import React, { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600">Profile</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your profile information and preferences.</p>
        </div>

        <div className="mt-8 bg-white shadow-xl rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <label htmlFor="profilePicture" className="cursor-pointer">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto bg-gray-200">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl text-gray-500">Add Image</span>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-600 font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
