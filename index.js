const express = require('express');
const dotEnv = require('dotenv');
const app = express();
const mongoose = require("mongoose");
const vendorRoutes = require('./routes/vendorRoutes')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const bodyParser = require("body-parser");
const path = require('path');


const PORT = process.env.PORT || 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('connected to DB'))
.catch((err) => console.log(err))

app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Suby</h1>")
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT}`);
})

