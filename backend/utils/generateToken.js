const jwt = require('jsonwebtoken')

const generateToken =(id) =>{
    return jwt.sign({id: id},"udaya24",{
        expiresIn :"30d",
    });
};
module.exports=generateToken;
