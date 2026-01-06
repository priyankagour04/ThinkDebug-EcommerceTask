// server.js
const app = require('./app');
const {  PORT, APP_HOST } = require('./src/Config/config');

const authRoutes = require("./src/Routes/authRoute");
const adminRoutes = require("./src/Routes/adminRoute");
const userRoutes = require("./src/Routes/userRoute")
const paymentRoutes = require("./src/Routes/paymentRoutes");

app.use("/auth/api", authRoutes);
app.use("/admin/api", adminRoutes)
app.use("/user/api", userRoutes)
app.use("/payment/api", paymentRoutes);


// app.use("/auth", publicRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(` Server running at http://${APP_HOST}:${PORT}`);
});
