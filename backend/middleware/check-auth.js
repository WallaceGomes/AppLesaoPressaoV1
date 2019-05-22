const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "senhamuitograndealgoritmo");
        next();
    }catch(error) {
        res.status(401).json({ message: "Erro de autenticação"});
    }
};