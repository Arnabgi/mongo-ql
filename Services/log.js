const users = require('../Model/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports={
    insertData : async(data,token) =>{
    try {
        let emailCheck = await users.findOne({email : data.email});
        if(!emailCheck){
            const create_user = await users.create(data);
            const generate_token = jwt.sign(create_user.toJSON(),token);
            return generate_token;
        }
        else{
            throw "User already exists";
        }

    } catch (error) {
        throw error;
    }
   },
   
   signIn : async(login_data,log_token) =>{
    try {
        let checkEmail = await users.findOne({email : login_data.email});
        if(checkEmail){
            let pass =bcrypt.compare(login_data.password,checkEmail.password);
            if(pass){
                let token = await jwt.sign(checkEmail.toJSON(),log_token);
                return token;
            }
            else{
                throw "Invalid password";
            }
        }
        else{
            throw "User is not exists";
        }
    } catch (error) {
        
    }
   }
}