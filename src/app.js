const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const app = express();
mongoose.set("strictQuery", false);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const DB = process.env.DBCONNECTION;

const customers = [
  {
    name: "OAK",
    industry: "Music",
  },
  {
    name: "KATE",
    industry: "Cosmetic",
  },
];

const customer = new Customer({
  name: "OAK",
  industry: "marketing",
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/customers", async (req, res) => {
  try {
    const data = await Customer.find();
    res.json({ customers: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json({ customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/customers/:id", async (req, res) => {
  res.json({ reqParams: req.params });
});

const start = async () => {
  try {
    await mongoose.connect(DB);
    app.listen(PORT, () => {
      console.log("app listening on port " + PORT);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
