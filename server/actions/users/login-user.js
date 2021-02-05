'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const httperror = require('http-errors');
const { UserRepository } = require('../../repository/users');


class LoginUser{
    constructor({ email, password}){
        this.email = email;
        this.password = password;
    }
    async execute(){
        try{
            let userRepository = new UserRepository(); 
            let user = await userRepository.getUserByEmail({email:this.email});
            if(!user){
                throw new httperror(400, "Email/Password Incorrect");    
            }
            let is_valid = bcrypt.compareSync(this.password, user.password);
            if(!is_valid){
                throw new httperror(400, "Email/Password Incorrect");    
            }
            delete user.password;
            let token = jwt.sign({ 
                user_id: user._id,
                name : user.name,
                email : user.email,
            }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
            });
            return ({ 
                token,
                user_id : user._id,
                name : user.name,
                email : user.email,
            });
        } catch (error) {
            throw new httperror(error.status, error.message); 
        }
    }
}
exports.LoginUser = LoginUser;   
