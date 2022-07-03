const jwt = require("jsonwebtoken")

const cerifyToken = (req,res,next) => {
    
    const authHeader = req.headers.token;
    if(authHeader){
        jwt.verify(token, process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("Token is not valid!");
            req.user=user;
            next();
        })
    } else{
        return res.status(401).json("you are not authenticated!")
    }
    //jwt.verify 토큰 인증 확인
}