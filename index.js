const express = require('express')
const app = express()
const cors = require('cors')
const connection = require("./db");
const User = require('./models/user')
const authRoutes=require('./routes/auth')

// database connection
connection()

app.use(cors())
app.use(express.json())

app.use("/api/", authRoutes);

app.listen(1337, () => {
	console.log('Server started on 1337')
})