const jwt = require("jsonwebtoken");

const config = require("../config/auth.config");

const User = require("../db/models/user");



verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    
    req.userId = decoded.id; 
    console.log(decoded.id)
    next();
  }); 
};

isSuperAdmin = (req, res, next) => {
    try{
    User.query().findById(req.userId).then((user)=>{
        let check = user.roles;
        if(check == 'Super Admin'){
         next();
         return;
        }
        else{
         res.status(401).send({message:"you are not authorized"})
        }
      })
 } catch(error) {
    res.status(500).send({message:"something wrong please check and try again"})
 } 
};

isAdmin = (req, res, next) => {
  
 try {
    User.query().findById(req.userId).then((user,err)=>{
        if(!user){
          res.status(400).json({message:"User Doesn't Exist Check and Try Again"})
        }else{
        let check = user.roles 
        if(check == 'Admin'){
         next();
         return;
        }
        else{
         res.status(401).send({message:"you are not authorized"})
        }
      }
      })
    
 } catch (error) {
    res.status(500).send({message:"something wrong please check and try again"})
 }
}

isUser = (req, res, next) => {
    try{ 
    User.query().findById(req.userId).then((user)=>{
        let check = user.roles;
        if(check == 'user'){
         next();
         return;
        }
        else{
         res.status(401).send({message:"you are not authorized"})
        }
      })
 } catch(error) {
    res.status(500).send({message:"something wrong please check and try again"})
 } 
};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,  
  isUser: isUser,
  isSuperAdmin:this.isSuperAdmin
  
};

module.exports = authJwt;