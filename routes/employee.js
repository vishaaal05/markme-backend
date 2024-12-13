const express = require("express");
const { object, string } = require("zod");
const jwt = require("jsonwebtoken");
const { Employee } = require("../db.js");
const { JWT_SECRET } = require("./config.js");

const router = express.Router();
const { sign } = jwt;

const signupBody = object({
    name: string(),
    email: string().email(),
    role: string(),
    password: string(),
});

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }

    const existingEmployee = await Employee.findOne({
        email: req.body.email,
    });

    if (existingEmployee) {
        return res.status(411).json({
            message: "Email already exists",
        });
    }

    const employee = await Employee.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    });

    const employeeId = employee._id;

    const token = sign({ employeeId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token,
    });
});

module.exports = router;
