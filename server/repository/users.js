'use strict'
const httperror = require('http-errors');
const { User } = require('../models/user');

class UserRepository{
    async createUser({name, email}){
        try{
            let userObj ={};
            userObj.name = name;
            userObj.email = email;
            let result = await User.create(userObj);
            return result.toObject();
        }catch(error) {
            throw new httperror(error.status||400, "Email is already registered"); 
        }
    }

    async deleteUserByEmailId({email}){
        try{
            let result = await User.deleteOne({email, is_active:false});
            return result
        }catch(error) {
            throw new httperror(error.status||400, error.message||"Email is already registered"); 
        }
    }

    async updateUser({email, password}){
        try{
            let result = await User.findOneAndUpdate({email,is_active:false},{is_active:true, password: password},{new:true}).lean();
            return result
        }catch(error) {
            throw new httperror(error.status||400, error.message||"Email is already registered"); 
        }
    }

    async getUserByEmail({email}){
        try{
            let result = await User.findOne({email,is_active:true}).lean();
            return result
        }catch(error) {
            throw new httperror(error.status||400, error.message||"Email is already registered"); 
        }
    }
}

exports.UserRepository = UserRepository;


