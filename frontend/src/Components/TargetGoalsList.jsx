import React, { useEffect, useState } from "react";
import axios from "axios";

const TargetGoalsList = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://localhost:3001/target-goals", { withCredentials: true });
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error.response?.data || error.message);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Your Savings Goals</h2>
      {goals.length > 0 ? (
        <ul className="space-y-2">
          {goals.map((goal) => (
            <li key={goal._id} className="p-2 border rounded-md bg-gray-100">
              <strong>Amount:</strong> ${goal.targetAmount} | <strong>Date:</strong> {new Date(goal.targetDate).toDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No goals set yet.</p>
      )}
    </div>
  );
};

export default TargetGoalsList;
