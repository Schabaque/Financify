// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';  // Importing Navbar component
import Footer from './Components/Footer';  // Importing Footer component
import Home from './pages/Home';          // Importing Home page
import Login from './pages/Login';        // Importing Login page
import Signup from './pages/Signup';      // Importing Signup page
import Dashboard from './Components/Dashboard'; // Importing Dashboard page
import AddTransaction from './Components/AddTransaction'; // Importing AddTransaction page
import TransactionList from './Components/TransactionList'; // Importing TransactionList page
import Categories from './Components/Categories'; // Importing Categories page
import Reports from './Components/Reports'; // Importing Reports page
import Settings from './Components/Settings'; // Importing Settings page
import Profile from './Components/Profile'; // Importing Profile page
//import Notifications from './Components/Notifications'; // Importing Notifications page
import Modal from './Components/Modal'; // Importing Modal component
import TargetSavingsForm from './Components/TargetSavingsForm';
import SavingsPrediction from './Components/SavingsPrediction';
const App = () => {
  return (
    <Router>
      <Navbar />  {/* Navbar is present on all pages */}
      
      <div className="min-h-screen flex flex-col">
        {/* Define the routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions/add" element={<AddTransaction />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        
          <Route path="/TargetSavingsForm" element={<TargetSavingsForm />} />
          <Route path="/SavingsPrediction" element={<SavingsPrediction />} />
        </Routes>
      </div>
      
      <Footer />  {/* Footer is present on all pages */}
    </Router>
  );
};

export default App;
