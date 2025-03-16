import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
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
  
          const incomeTransactions = transactions.filter((item) => item.type === "income");
          const expenseTransactions = transactions.filter((item) => item.type === "expense");
  
          const totalIncome = incomeTransactions.reduce((sum, item) => sum + (item.amount || 0), 0);
          const totalExpenses = expenseTransactions.reduce((sum, item) => sum + (item.amount || 0), 0);
  
          setIncome(totalIncome);
          setExpenses(totalExpenses);
          setIsLoggedIn(true);
  
          const categoryMap = {};
          expenseTransactions.forEach((item) => {
            if (categoryMap[item.category]) {
              categoryMap[item.category] += item.amount;
            } else {
              categoryMap[item.category] = item.amount;
            }
          });
  
          const formattedData = Object.keys(categoryMap).map((category) => ({
            name: category,
            value: ((categoryMap[category] / totalExpenses) * 100),
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
      <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
        <div className="max-w-5xl w-full text-center space-y-6">
          <h1 className="text-5xl font-bold text-indigo-600">FinanciFy!</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
           One stop solution to Track your expenses and manage your financial goals efficiently.
          </p>
        </div>
  
        <div className="mt-10 bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Current Balance</h2>
          <p className="mt-3 text-5xl font-bold text-green-500">₹{income - expenses}</p>
        </div>
  
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[{ title: "Transactions", link: "/transactions" },
            { title: "Categories", link: "/categories" },
            { title: "Reports", link: "/reports" }].map(({ title, link }) => (
              <div key={title} className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
                <h3 className="text-2xl font-semibold text-indigo-600">{title}</h3>
                <p className="mt-2 text-gray-600">Manage your {title.toLowerCase()} efficiently.</p>
                <Link to={link}>
                  <button className="mt-5 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300">
                    Go to {title}
                  </button>
                </Link>
              </div>
          ))}
        </div>
  
        <div className="mt-12 text-center text-lg text-gray-600">
          Need help? Check out <Link to="/settings" className="text-indigo-600 font-semibold">Settings</Link> or <Link to="/login" className="text-indigo-600 font-semibold">Login</Link> to manage your account.
        </div>
      </div>
    );
};

export default Home;