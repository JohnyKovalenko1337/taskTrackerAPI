const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(403).send({
            message: "No token provided!"
          });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecret')
    }
    catch (err) {
        return res.status(403).send({
            message: err.message
          });
    }
    if (!decodedToken) {
        return res.status(403).send({
            message: "token not verified"
          });
    }
    req.userId = decodedToken.userId;
    next();
}