require("dotenv").config();
const { connectDB } = require("./config/database-config");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(express.json());

// Set up express session (passport requires session for OAuth flow)
app.use(
  session({
    secret: process.env.JWT_SECRET || "your_jwt_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./modules/auth/auth-routes"));
app.use("/api/users", require("./modules/users/users-routes"));
app.use("/api/reservations", require("./modules/reservations/reservations-routes"));

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
