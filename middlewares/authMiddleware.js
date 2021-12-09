const jwt = require("jsonwebtoken")

module.exports = (req,res,next) => {
    var token;
    if(req.headers["x-access-token"]){
        token = req.headers["x-access-token"]
    }
    if(req.headers["token"]){
        token = req.headers["token"]
    }
    if(req.headers["authorization"]){
        token = req.headers["authorization"]
    }
    if(!token){
        return res.status(401).json({
            msg: 'Unauthorized user'
        })
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) return res.status(401).json({
            msg: 'token generation failed'
        })
        req.userId = decoded.userId;
        next();
    })
}