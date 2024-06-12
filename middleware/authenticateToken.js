const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, 'one'); 
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};

module.exports = authenticateToken;
