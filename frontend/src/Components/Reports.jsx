// src/pages/Reports.jsx

import React from 'react';

const Reports = () => {
  // Sample data for financial reports
  const reportData = [
    {
      id: 1,
      title: 'Monthly Income vs Expenses',
      description:
        'A comparison of income and expenses over the last month. Helps you understand where your money is coming from and going.',
      value: '$3,200',
      type: 'income',
    },
    {
      id: 2,
      title: 'Yearly Budget Analysis',
      description:
        'An analysis of your yearly financial goals and how close you are to meeting them. Useful for planning and saving.',
      value: '$18,500',
      type: 'expense',
    },
    {
      id: 3,
      title: 'Investment Portfolio Performance',
      description:
        'Overview of your investment portfolio’s performance, including stock, crypto, and other assets.',
      value: '$5,400',
      type: 'investment',
    },
    {
      id: 4,
      title: 'Debt Repayment Tracker',
      description:
        'A breakdown of your debt repayment plan, highlighting amounts paid and remaining balance.',
      value: '$1,500',
      type: 'debt',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Financial Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportData.map((report) => (
          <div
            key={report.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-indigo-600">{report.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{report.description}</p>
            <div
              className={`mt-4 text-2xl font-bold ${
                report.type === 'income'
                  ? 'text-green-600'
                  : report.type === 'expense'
                  ? 'text-red-600'
                  : report.type === 'investment'
                  ? 'text-blue-600'
                  : 'text-yellow-600'
              }`}
            >
              {report.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
