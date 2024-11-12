const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const productRoutes = require('./Routes/product'); 
// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', productRoutes);

app.get("/", (req, res) => {
  return res.send("Hi Everyone.");
});



app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));