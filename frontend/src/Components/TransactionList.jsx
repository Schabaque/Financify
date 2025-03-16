import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/transactions', { withCredentials: true });
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading transactions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Transaction History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4">{transaction.description}</td>
                  <td className="px-6 py-4">{transaction.category}</td>
                  <td className={`px-6 py-4 font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className={`px-6 py-4 font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-600">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='my-10'>
        <button
                onClick={() => navigate("/transactions/add")}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
              >
                 Add Transaction
              </button>
      </div>
      </div>
    </div>
  );
};

export default TransactionList;
