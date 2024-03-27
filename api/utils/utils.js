const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const hashPassword = async(password)=>{
    try {
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password , saltRound)
        return hashPassword;
    } catch (error) {
        console.log(error);
    }
}
const comparePass = async(password , hasedpassword)=>{
    return bcrypt.compare(password , hasedpassword)
}

const TokenVerification  = (req, res ,next)=>{
    try {
        const token = req.cookies.access_token;
        if(token){
           const decode = jwt.verify(token , process.env.SECRET_KEY)
        //    console.log(decode);
           req.user = decode
           next()
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {hashPassword ,comparePass ,TokenVerification}