import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import SavingsPrediction from "./SavingsPrediction";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF", "#FF6384"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {name} ({`${(percent * 100).toFixed(0)}%`})
    </text>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:3001/transactions", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const transactions = await response.json();
        console.log("Raw Transactions Data:", transactions);

        // Filter transactions correctly
        const incomeTransactions = transactions.filter((item) => item.type === "income");
        const expenseTransactions = transactions.filter((item) => item.type === "expense");

        console.log("Filtered Income Data:", incomeTransactions);
        console.log("Filtered Expenses Data:", expenseTransactions);

        // Calculate totals
        const totalIncome = incomeTransactions.reduce((sum, item) => sum + (item.amount || 0), 0);
        const totalExpenses = expenseTransactions.reduce((sum, item) => sum + (item.amount || 0), 0);

        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setIsLoggedIn(true);

        // Process expense categories for Pie Chart
        const categoryMap = {};
        expenseTransactions.forEach((item) => {
          if (categoryMap[item.category]) {
            categoryMap[item.category] += item.amount;
          } else {
            categoryMap[item.category] = item.amount;
          }
        });

        // Convert object to array format for recharts
        const formattedData = Object.keys(categoryMap).map((category) => ({
          name: category,
          value: ((categoryMap[category] / totalExpenses) * 100), // Convert to percentage
        }));

        setExpenseData(formattedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoggedIn(false);
        navigate("/login");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Overview of your financial activity.</p>
        </div>

        {!isLoggedIn ? (
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">Please log in to access your dashboard.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Total Income Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-green-500">Total Income</h2>
              <p className="text-3xl font-bold text-green-600">₹{income}</p>
            </div>

            {/* Total Expenses Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-red-500">Total Expenses</h2>
              <p className="text-3xl font-bold text-red-600">₹{expenses}</p>
            </div>

            {/* Balance Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-indigo-600">Balance</h2>
              <p className="text-3xl font-bold text-indigo-600">₹{income - expenses}</p>
            </div>
          </div>
        )}

        {/* Expense Pie Chart */}
        {isLoggedIn && (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Expense Breakdown</h2>
            {expenseData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ ...props }) => renderCustomizedLabel({ ...props, name: props.name })}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 mt-4">No expense data available</p>
            )}

            {/* Add Goal & Add Transaction Buttons */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/TargetSavingsForm")}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                 Add Goal
              </button>
              <button
                onClick={() => navigate("/transactions/add")}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
              >
                 Add Transaction
              </button>
            </div>
            <SavingsPrediction/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
