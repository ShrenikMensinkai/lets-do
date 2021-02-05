'use strict'
const httperror = require('http-errors');
const { ItemsRepository } = require('../../repository/items');

class CreateItem{
    constructor({ title, user_id}){
        this.title = title;
        this.user_id = user_id;
    }
    async execute(){
        try{
            let itemsRepository = new ItemsRepository(); 
            let item = await itemsRepository.createItem({title:this.title, user_id:this.user_id});
            item.item_id = item._id;
            delete item._id;
            delete item.__v;
            return item;
        } catch (error) {
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }   
}
exports.CreateItem =CreateItem;   
