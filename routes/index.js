const express = require("express");
const employeeRouter = require("./employee.js");

const router = express.Router();

router.use("/employee", employeeRouter);

module.exports = router;

// /api/v1/employee