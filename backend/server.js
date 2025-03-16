const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const UserModel = require("./models/User") // Assuming your user model is in models/User.js
const session = require("express-session")
const MongoStore = require("connect-mongo")

dotenv.config()

const app = express()

// Middleware to log session state for debugging


// Middleware
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTENDURL || "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent
  }),
)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret", // Use a secret
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Ensure this matches your database connection
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }, // 1 day
  }),
)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Finance Tracker Backend!")
})

app.get("/home", (req, res) => {
  res.send("Welcome to the Finance Tracker Backend Home!")
})

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })

    if (user) {
      const passwordMatched = await bcrypt.compare(password, user.password)
      if (passwordMatched) {
        req.session.user = { id: user._id, email: user.email, name: user.name } // Save user in session
        console.log("Session after login:", req.session) // Debug log
        res.status(200).json({ message: "Success" })
      } else {
        res.status(401).json({ message: "Password does not match" })
      }
    } else {
      res.status(401).json({ message: `Account with email ${email} does not exist` })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "Email exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// User Route (to fetch session data)
app.get("/user", (req, res) => {
  console.log("Session on /user route:", req.session) // Debug log
  if (req.session.user) {
    res.json({ user: req.session.user })
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
})

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
}

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // income or expense
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

const Transaction = mongoose.model("Transaction", transactionSchema)

// Routes
app.post("/transactions", isAuthenticated, async (req, res) => {
  try {
    const { type, amount, description, category } = req.body
    const userId = req.session.user.id

    const transaction = new Transaction({
      type,
      amount,
      description: description || "" ,
      category,
      userId,
    })

    await transaction.save()
    res.status(201).json({ message: "Transaction added successfully", transaction })
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error })
  }
})

// Get Transactions for Logged-in User
app.get("/transactions", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id
    const transactions = await Transaction.find({ userId })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error })
  }
})

// Get dashboard data
app.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id
    const transactions = await Transaction.find({ userId })
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expenses = transactions.filter((t) => t.type === "expense")
    res.json({ totalIncome, expenses })
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error })
  }
})

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out, please try again" })
    }
    res.clearCookie("connect.sid")
    return res.json({ message: "Logged out successfully" })
  })
})

// Port Configuration
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log("MongoDB URI:", process.env.MONGO_URI) // Debug log
})

const TargetGoal = require("./models/TargetGoal"); // Import the TargetGoal model

// Add a new savings goal
app.post("/target-goals", isAuthenticated, async (req, res) => {
  try {
    const { targetDate, targetAmount } = req.body;
    const userId = req.session.user.id; // Retrieve the logged-in user ID from session

    if (!targetDate || !targetAmount) {
      return res.status(400).json({ message: "Please provide target date and amount." });
    }

    const newGoal = new TargetGoal({
      userId,
      targetDate,
      targetAmount,
    });

    await newGoal.save();
    res.status(201).json({ message: "Goal added successfully", goal: newGoal });
  } catch (error) {
    res.status(500).json({ message: "Error adding goal", error });
  }
});

// Get target goals for logged-in user
app.get("/target-goals", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const goals = await TargetGoal.find({ userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching target goals", error });
  }
});
