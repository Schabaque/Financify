import React, { useEffect, useState } from "react";
import axios from "axios";

const SavingsPrediction = () => {
  const [goals, setGoals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

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
      setGoals([...goals, response.data.goal]); // Update UI with new goal
      setTargetAmount("");
      setTargetDate("");
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-16 bg-white shadow-md rounded-md w-full">
        <h2 className="text-xl font-semibold mb-4">Savings Predictions</h2>
        <p className="text-red-600">Please log in to view your savings predictions.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-full">
      <h2 className="text-xl font-semibold mb-4">Savings Predictions</h2>

   

      {loading ? (
        <p>Loading savings predictions...</p>
      ) : goals.length === 0 ? (
        <p className="text-gray-500">No savings goals added.</p>
      ) : (
        goals.map((goal) => {
          const targetDate = new Date(goal.targetDate);
          const currentDate = new Date();
          const daysRemaining = Math.max(0, Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24)));

          const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
          const averageDailyExpenditure = expenses.length > 0 ? totalExpenses / expenses.length : 0;
          const requiredDailySavings = daysRemaining > 0 ? goal.targetAmount / daysRemaining : goal.targetAmount;

          const isOnTrack = averageDailyExpenditure <= requiredDailySavings;

          return (
            <div key={goal._id} className="mb-4 p-4 border rounded-md bg-gray-100">
              <p>
                <strong>Goal:</strong> ₹{goal.targetAmount} by {targetDate.toDateString()}
              </p>
              <p>
                <strong>Days Remaining:</strong> {daysRemaining}
              </p>
              <p>
                <strong>Average Daily Expenditure:</strong> ₹{averageDailyExpenditure.toFixed(2)}
              </p>
              <p>
                <strong>Required Daily Savings:</strong> ₹{requiredDailySavings.toFixed(2)}
              </p>
              <p className="mt-2">
                {isOnTrack ? (
                  <span className="text-green-600">You're on track to meet this goal! 🎉</span>
                ) : (
                  <span className="text-red-600">
                    You need to reduce daily spending by ₹{(averageDailyExpenditure - requiredDailySavings).toFixed(2)}.
                  </span>
                )}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SavingsPrediction;
