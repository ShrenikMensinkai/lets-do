'use strict'
const httperror = require('http-errors');
const { ItemsRepository } = require('../../repository/items');

class DeleteItem{
    constructor({item_id, user_id}){
        this.user_id = user_id;
        this.item_id = item_id;
    }
    async execute(){
        try{
            let itemsRepository = new ItemsRepository(); 
            let item = await itemsRepository.deleteItem({user_id:this.user_id, item_id:this.item_id});
            return item;
        } catch (error) {
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }   
}
exports.DeleteItem =DeleteItem;   
