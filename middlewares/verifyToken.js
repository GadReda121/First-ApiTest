const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => { 
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];

    if (!authHeader) { 
        return res.status(401).json({ status: httpStatusText.FAIL, data: { msg : 'Token is Required' } });
    }

    const token = authHeader && authHeader.split(' ')[1];

    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = currentUser;
        next(); 
    } catch(err) {
        return res.status(401).json({ status: httpStatusText.FAIL, data: { msg : 'Invalid Token' } });
    }

}

module.exports = verifyToken;