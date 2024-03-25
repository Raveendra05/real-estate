const bcrypt = require('bcrypt')
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
module.exports = {hashPassword ,comparePass}