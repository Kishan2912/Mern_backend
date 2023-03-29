const express = require('express')
const app = express()
const cors = require('cors')
const connection = require("./db");
const User = require('./models/user')
const authRoutes=require('./routes/auth')
const path=require("path")

// database connection
connection()

app.use(cors())
app.use(express.json())

app.use("/api/", authRoutes);

app.use(express.static(path.join(__dirname, "../Mern_Frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(
     path.resolve(__dirname, "../", "Mern_Frontend", "build", "index.html")
  )
);

app.listen(1337, () => {
	console.log('Server started on 1337')
})