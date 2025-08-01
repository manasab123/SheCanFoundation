const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb://localhost:27017/intern_portal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema with Rank Field
const Intern = mongoose.model("Intern", {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, required: true },
  donations: { type: Number, default: 0 },
  rank: { type: Number, default: null }
});

// ✅ Rank Updater Function
const updateRanks = async () => {
  const users = await Intern.find().sort({ donations: -1 });

  for (let i = 0; i < users.length; i++) {
    const rank = i < 20 ? i + 1 : 30 + (i - 20);
    users[i].rank = rank;
    await users[i].save();
  }
};

// ✅ Register Route
app.post('/register', async (req, res) => {
  const { name, email, password, referrerCode } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const existingUser = await Intern.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: 'User already exists' });

    // Optional: Check referral code
    if (referrerCode) {
      const referrer = await Intern.findOne({ referralCode: referrerCode });
      if (!referrer) {
        return res.status(400).json({ message: 'Invalid referral code' });
      }
      console.log(`${referrer.name} referred ${name}`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = name.substring(0, 4).toUpperCase() + '2025';

    const newUser = new Intern({
      name,
      email,
      password: hashedPassword,
      referralCode
    });

    await newUser.save();
    await updateRanks(); // ✅ Recalculate ranks

    res.status(201).json({
      message: 'Registration successful',
      user: {
        name,
        email,
        referralCode
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await Intern.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// ✅ Middleware: Auth Token Checker
const authenticateToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied. Token missing.' });

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// ✅ Dashboard Route
app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await Intern.findById(req.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      name: user.name,
      referralCode: user.referralCode,
      donations: user.donations,
      rank: user.rank
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard" });
  }
});

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
