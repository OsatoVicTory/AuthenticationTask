const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = 3000;
const routes = require("./routes/authRoutes.js");
const uri = process.env.ATLAS_URI;
// app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) console.log(err);
    else console.log("mongodb connected succefully");
});

app.use("/", routes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})