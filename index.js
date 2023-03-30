const express = require('express')
const app = express()
const cors = require('cors')
const connection = require("./utils/db");
const User = require('./models/user')
const authRoutes=require('./routes/user')
const path=require("path")
const dotenv = require('dotenv');
dotenv.config();


// database connection
connection()

app.use(cors())
app.use(express.json())

// api routes
app.use("/api/", authRoutes);

// Connect frontend
app.use(express.static(path.join(__dirname, "../Mern_Frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(
     path.resolve(__dirname, "../", "Mern_Frontend", "build", "index.html")
  )
);

app.listen(1337, () => {
	console.log('Server started on 1337')
})