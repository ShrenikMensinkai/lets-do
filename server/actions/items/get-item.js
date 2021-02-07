'use strict'
const httperror = require('http-errors');
const { ItemsRepository } = require('../../repository/items');

class GetItem{
    constructor({ item_id, user_id}){
        this.item_id = item_id;
        this.user_id = user_id;
    }
    async execute(){
        try{
            let itemsRepository = new ItemsRepository(); 
            let item = await itemsRepository.getItem({item_id:this.item_id, user_id:this.user_id});
            if(this.item_id){
                item = item[0];
                item.id= item._id;
                delete item._id;
            }
            return item;
        } catch (error) {
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }   
}
exports.GetItem =GetItem;   
