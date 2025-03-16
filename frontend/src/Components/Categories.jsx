// src/pages/Categories.jsx

import React, { useState } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Groceries', color: 'bg-green-500' },
    { id: 2, name: 'Rent', color: 'bg-blue-500' },
    { id: 3, name: 'Utilities', color: 'bg-yellow-500' },
    { id: 4, name: 'Entertainment', color: 'bg-purple-500' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('');

  const handleAddCategory = () => {
    if (newCategory && categoryColor) {
      const newCategoryObj = {
        id: categories.length + 1,
        name: newCategory,
        color: categoryColor,
      };
      setCategories([...categories, newCategoryObj]);
      setNewCategory('');
      setCategoryColor('');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Categories</h1>

      {/* Categories List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-4 rounded-lg shadow-md text-white ${category.color}`}
          >
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Add New Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Add New Category</h2>
        <div className="mb-4">
          <label htmlFor="category-name" className="block text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="category-name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter category name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category-color" className="block text-gray-700 mb-2">
            Select Color
          </label>
          <select
            id="category-color"
            value={categoryColor}
            onChange={(e) => setCategoryColor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Category Color</option>
            <option value="bg-green-500">Groceries - Green</option>
            <option value="bg-blue-500">Rent - Blue</option>
            <option value="bg-yellow-500">Utilities - Yellow</option>
            <option value="bg-purple-500">Entertainment - Purple</option>
          </select>
        </div>

        <button
          onClick={handleAddCategory}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default Categories;
