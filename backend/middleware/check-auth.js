const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    
    try { // usado para autenticar o usuário por meio de senha, 
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.dadosUsuario = {email: decodedToken.email, usuarioId: decodedToken.usuarioId};
        next();
    }catch(error) { // se senha for igual a do servidor entao o usuário entra caso contrário erro
        res.status(401).json({ message: "Erro de autenticação!"});
    }
};