const config = require('../config/auth.config');

const User = require('../db/models/user');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


exports.findone = async(req,res)=>{
         try {
              const {id} = req.params;
              const result = await User.query().findById(id)
              if(result){
                res.status(200).json(result)
               }
               else{
                res.status(404).json({message:"User Doesn't exist check and try again"})
               }
                          
         } catch (err) {
            return res.status(500).json({message:"SomeThing Went Wrong Please Try Again",error:err})
         }
          

}

exports.register = async(req,res)=>{
    try {
         
         const salt = await bcrypt.genSalt(10);
         const userData = ({
        
        name:req.body.name,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password,salt),
        roles:req.body.roles
       })
       if(req.body.roles == "Super Admin"){
        const super_admin = await User.query().insert(userData)  
         return res.status(201).json({message:"User Registered Sucessfully",data:super_admin})
        }else{
            if(req.body.roles == "Admin"){
                const admin = await User.query().insert(userData)  
                 return res.status(201).json({message:"User Registered Sucessfully",data:admin})
            }
            else{
                if(req.body.roles == "user"){
                    const users = await User.query().insert(userData)  
                    return res.status(201).json({message:"User Registered Sucessfully",data:users})
                }
            } 
            return res.json("please provide valid role")   
        }
         
      
     }catch (error) { 
       
        return res.status(500).json({message:"SomeThing Went Wrong Please Try Again",error:err})
    }
     

}
exports.signin = async(req,res)=>{
    try {
        User.query().findOne({
            name:req.body.name
        }).then(user=>{
            if(!user){
                return res.status(404).json({message:"User not found"}) 
            }
            var passwordisValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passwordisValid){
                return res.status(401).send({
                    accesstoken:null,
                    message:"invalid password"
                });
            }
            var token = jwt.sign({id:user.id},config.secret,{
                expiresIn:"1d"
            })
            res.status(200).json({
                
                name:user.name,
                email:user.email,
                roles:user.roles,
                accesstoken:token
            })
        });
       
    } catch (error) {
        return res.status(500).json({message:"SomeThing Went Wrong Please Try Again",error:err})
    }
}