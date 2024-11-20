const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const productRoutes = require('./Routes/product'); 
// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/product', productRoutes);

app.get("/", (req, res) => {
  return res.send("Hi Everyone.");
});



app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
