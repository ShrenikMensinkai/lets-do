'use strict'
const httperror = require('http-errors');
const { Email }   = require('../../util/config-mail');
const { UserRepository } = require('../../repository/users');
const { InviteRepository } = require('../../repository/invites');

class CreateUser{
    constructor({ name, email}){
        this.name = name;
        this.email = email;
    }
    async execute(){
        try{
            let userRepository = new UserRepository(); 
            let inviteRepository = new InviteRepository(); 
            let emailObj = new Email(); 
            await userRepository.deleteUserByEmailId({email:this.email});
            let user = await userRepository.createUser({name:this.name, email:this.email});
            await inviteRepository.deleteInviteByEmailId({email:this.email});
            let invite = await inviteRepository.createInvite({email:this.email});
            let inviteLink = this.createInviteLink({invite_id:invite._id});
            await emailObj.sendRegistrationMail(user.email,inviteLink);
            user.id = user._id;
            delete user._id;
            delete user.__v;
            return user;
        } catch (error) {
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }
    createInviteLink({invite_id}){
       let client_url = `http://localhost:3001/userregistration`;
       client_url = `${client_url}?invite_id=${invite_id}`;
       return client_url
    }
   
}
exports.CreateUser =CreateUser;   
