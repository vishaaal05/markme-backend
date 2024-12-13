const { JWT_SECRET } = require("./routes/config");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, JWT_SECRET);

        req.employeeId = decoded.employeeId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware};