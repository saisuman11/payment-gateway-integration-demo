const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve HTML file
app.use(express.static(path.join(__dirname)));

// 🔐 Keys removed for security
const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

// Create order API
app.post("/create-order", async (req, res) => {
  const options = {
    amount: 50000, // ₹500 in paise
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send("Error creating order");
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Payment Gateway Server Running 🚀");
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port 3000"));