const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({
            email: req.body.email,
        })

        console.log(user,"User")

        if(user){
            res.json({ status: 'error', error: 'This email id is used, please enter another email-id' })
        }
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Something went wrong' })
    }
}

const login = async (req, res) => {
    console.log("Login Request")

    const user = await User.findOne({
        email: req.body.email,
    })

    console.log(user, "user")

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' })
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.SECRET
        )

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
}

const getProfile = async (req, res) => {
    try {
        const email = req.user.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', name: user.name, email: user.email })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
}

const updateProfile = async (req, res) => {
    try {
        const email = req.user.email
        await User.updateOne(
            { email: email },
            { $set: { name: req.body.name } }
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
}

module.exports = { register, login, getProfile, updateProfile };