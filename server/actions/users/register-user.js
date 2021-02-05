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
            let result = userRepository.updateUser({email:invite.email, password: this.password});
            await inviteRepository.deleteInviteByEmailId({email:invite.email});
            return result;
        } catch (error) {
            throw new httperror(error.status, error.message); 
        }
    }
    createInviteLink({invite_id}){
       let client_url = `http://localhost:3001/userregistration`;
       client_url = `${client_url}?invite_id=${invite_id}`;
       return client_url
    }
   
}
exports.RegisterUser =RegisterUser;   
