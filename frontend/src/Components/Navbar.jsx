import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { FaChartLine, FaExchangeAlt, FaTags, FaChartBar, FaCog, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import "../styles/navbar-animations.css"

const Navbar = () => {
  const location = useLocation()
  const user = location.state?.user

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check user status dynamically
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/user", {
          credentials: "include",
        })
        if (response.ok) {
          const data = await response.json()
          setIsLoggedIn(true)
          // You might want to store user data in a context or state management solution
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error("Error checking login status:", error)
        setIsLoggedIn(false)
      }
    }

    checkLoginStatus()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/logout", {
        method: "POST",
        credentials: "include",
      })
      setIsLoggedIn(false)
      // Redirect to home or login page
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const navItems = [
    { to: "/dashboard", text: "Dashboard", icon: FaChartLine },
    { to: "/transactions", text: "Transactions", icon: FaExchangeAlt },
    { to: "/categories", text: "Categories", icon: FaTags },
    { to: "/reports", text: "Reports", icon: FaChartBar },
    { to: "/settings", text: "Settings", icon: FaCog },
  ]

  return (
    <nav className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="text-2xl font-bold flex items-center">
              <FaChartLine className="w-10 sm:mr-2 leading-normal" />
              <span className="bg-clip-text text-base sm:text-[28px] text-transparent bg-gradient-to-r from-green-300 to-blue-300">
                Financify
              </span>
            </Link>
          </motion.div>

          <div className="hidden lg:flex space-x-4">
            {navItems.map((item) => (
              <motion.div key={item.to} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link to={item.to} className="nav-link text-lg flex items-center px-3 py-2 rounded-md">
                  <item.icon className="mr-2" />
                  {item.text}
                </Link>
              </motion.div>
            ))}

            {isLoggedIn ? (
              <motion.button
                onClick={handleLogout}
                className="nav-link text-lg bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt className="mr-2" />
                {user?.name || "User"} (Logout)
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="nav-link text-lg bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md flex items-center"
                >
                  <FaSignInAlt className="mr-2" />
                  Login/Signup
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

