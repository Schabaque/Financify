import React, { useState, useEffect } from "react";
import axios from "axios";
import TargetGoalsList from "./TargetGoalsList"; // Importing the goals list component

const TargetSavingsForm = ({ onSaveTarget }) => {
  const [goals, setGoals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [showGoals, setShowGoals] = useState(false); // Fix: Defined the state

  useEffect(() => {
    const fetchGoalsAndExpenses = async () => {
      try {
        const goalsResponse = await axios.get("http://localhost:3001/target-goals", {
          withCredentials: true,
        });
        const expensesResponse = await axios.get("http://localhost:3001/transactions", {
          withCredentials: true,
        });

        setGoals(goalsResponse.data);
        setExpenses(expensesResponse.data.filter((txn) => txn.type === "expense"));
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGoalsAndExpenses();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/target-goals",
        { targetDate, targetAmount },
        { withCredentials: true }
      );
      setGoals([...goals, response.data.goal]); // Fix: Update UI with new goal correctly
      setTargetAmount("");
      setTargetDate("");
      setShowGoals(true); // Show goals after adding
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-white shadow-md rounded-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Savings Predictions</h2>
        <p className="text-red-600">Please log in to view your savings predictions.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Set Your Savings Goal</h2>
      <form onSubmit={handleAddGoal} className="mb-4">
        <div className="flex flex-col space-y-2">
          <label className="font-medium">Target Amount (₹):</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="p-2 border rounded-md"
            required
          />

          <label className="font-medium">Target Date:</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="p-2 border rounded-md"
            required
          />

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            ➕ Add Goal
          </button>
        </div>
      </form>

      {/* Toggle goals list visibility */}
      <button
        onClick={() => setShowGoals(!showGoals)}
        className="mt-2 text-blue-600 underline"
      >
        {showGoals ? "Hide Goals" : "Show Goals"}
      </button>

      {showGoals && <TargetGoalsList goals={goals} />}
    </div>
  );
};

export default TargetSavingsForm;
