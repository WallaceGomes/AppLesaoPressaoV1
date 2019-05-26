const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "senhamuitograndealgoritmo");
        req.dadosUsuario = {email: decodedToken.email, usuarioId: decodedToken.usuarioId};
        next();
    }catch(error) {
        res.status(401).json({ message: "Erro de autenticação!"});
    }
};