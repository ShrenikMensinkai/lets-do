'use strict'
const httperror = require('http-errors');
const { ItemsRepository } = require('../../repository/items');

class UpdateItem{
    constructor({ update_obj, item_id, user_id}){
        this.update_obj = update_obj;
        this.user_id = user_id;
        this.item_id = item_id;
    }
    async execute(){
        try{
            let itemsRepository = new ItemsRepository(); 
            let item = await itemsRepository.updateItem({update_obj:this.update_obj, user_id:this.user_id, item_id:this.item_id});
            item.item_id = item._id;
            delete item._id;
            delete item.__v;
            return item;
        } catch (error) {
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }   
}
exports.UpdateItem =UpdateItem;   
