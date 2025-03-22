require("dotenv").config();
const cookieParser = require("cookie-parser");

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;
const userRoutes = require("./routes/user");
const paymentRoutes = require("./routes/payment");
const disputeRoutes = require("./routes/dispute");
const milestoneRoutes = require("./routes/milestone");

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/freework/payment", paymentRoutes);
app.use("/freework/dispute", disputeRoutes);
app.use("/freework", milestoneRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
