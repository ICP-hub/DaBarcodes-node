const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const productRoutes = require("./Routes/product");
const promotionRoutes = require("./Routes/promotion");
// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: [
    'http://localhost:3000',  // Your React app's local URL
    'https://demo4.kaifoundry.com'  // Your actual domain if different
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/product", productRoutes);
app.use("/promotion", promotionRoutes);

app.get("/", (req, res) => {
  return res.send("Hi Everyone.");
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));