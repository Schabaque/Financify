import React, { useEffect, useState } from "react";
import axios from "axios";

const SavingsPrediction = () => {
  const [goals, setGoals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-white shadow-md rounded-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800">Savings Predictions</h2>
        <p className="text-red-600 mt-2">Please log in to view your savings predictions.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Savings Goals</h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading savings predictions...</p>
      ) : goals.length === 0 ? (
        <p className="text-gray-500 text-center">No savings goals added.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const targetDate = new Date(goal.targetDate);
            const currentDate = new Date();
            const daysRemaining = Math.max(0, Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24)));

            const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
            const averageDailyExpenditure = expenses.length > 0 ? totalExpenses / expenses.length : 0;
            const requiredDailySavings = daysRemaining > 0 ? goal.targetAmount / daysRemaining : goal.targetAmount;

            const isOnTrack = averageDailyExpenditure <= requiredDailySavings;

            return (
              <div key={goal._id} className="bg-gray-50 p-5 shadow-lg rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-indigo-700">Goal: ₹{goal.targetAmount}</h3>
                <p className="text-gray-600 text-sm">Deadline: {targetDate.toDateString()}</p>

                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>Days Remaining:</strong> {daysRemaining}
                  </p>
                  <p className="text-gray-700">
                    <strong>Avg Daily Expense:</strong> ₹{averageDailyExpenditure.toFixed(2)}
                  </p>
                  <p className="text-gray-700">
                    <strong>Required Daily Savings:</strong> ₹{requiredDailySavings.toFixed(2)}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full bg-gray-300 rounded-full h-3 mt-4">
                  <div
                    className={`h-3 rounded-full ${isOnTrack ? "bg-green-500" : "bg-red-500"}`}
                    style={{ width: `${Math.min((requiredDailySavings / (averageDailyExpenditure || 1)) * 100, 100)}%` }}
                  ></div>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {isOnTrack ? (
                    <span className="text-green-600 font-semibold">You're on track! 🎉</span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Reduce spending by ₹{(averageDailyExpenditure - requiredDailySavings).toFixed(2)}
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavingsPrediction;
