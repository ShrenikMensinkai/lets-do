'use strict'
const bcrypt = require('bcryptjs');
const httperror = require('http-errors');
const { UserRepository } = require('../../repository/users');
const { InviteRepository } = require('../../repository/invites');

class RegisterUser{
    constructor({ invite_id, password}){
        this.invite_id = invite_id;
        this.password = password;
    }
    async execute(){
        try{
            let userRepository = new UserRepository(); 
            let inviteRepository = new InviteRepository(); 
            let invite = await inviteRepository.checkInviteById({id:this.invite_id});
            if(!invite){
                throw new httperror(400, "Invite not found");    
            }
            this.password = bcrypt.hashSync(this.password, 8);
            let user = await userRepository.updateUser({email:invite.email, password: this.password});
            await inviteRepository.deleteInviteByEmailId({email:invite.email});
            user.id = user._id;
            delete user._id;
            delete user.__v;
            delete user.password;
            return user;
            
        } catch (error) {
            throw new httperror(error.status||500, error.message||"Internal server error");  
        }
    }
    createInviteLink({invite_id}){
       let client_url = process.env.CLIENT_APP;
       client_url = `${client_url}userregistration?invite_id=${invite_id}`;
       return client_url;
    }
   
}
exports.RegisterUser =RegisterUser;   
