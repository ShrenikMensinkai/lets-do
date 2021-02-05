'use strict'
const httperror = require('http-errors');
const { Invite } = require('../models/invite');

class InviteRepository{
    async createInvite({email}){
        try{
            let inviteObj ={};
            inviteObj.email = email;
            let result = await Invite.create(inviteObj);
            return result.toObject();
        }catch(error) {
            throw error;
        }
    }

    async deleteInviteByEmailId({email}){
        try{
            let inviteObj ={};
            inviteObj.email = email;
            let result = await Invite.deleteOne(inviteObj);
            return result
        }catch(error) {
            throw error;
        }
    }

    async checkInviteById({id}){
        try{
            let inviteId ={};
            inviteId._id = id;
            let result = await Invite.findOne(inviteId).lean();
            return result
        }catch(error) {
            throw error;
        }
    }

    
}

exports.InviteRepository = InviteRepository;


