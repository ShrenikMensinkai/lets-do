'use strict'
const httperror = require('http-errors');
const { Item } = require('../models/item');

class ItemsRepository{
    async createItem({title, user_id}){
        try{
            let itemObj ={};
            itemObj.title = title;
            itemObj.created_by = user_id;
            let result = await Item.create(itemObj);
            return result.toObject();
        }catch(error) {
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }

    async getItem({item_id, user_id}){
        try{
            let itemQuery ={
               created_by: user_id 
            };
            if(item_id)
                itemQuery._id = item_id; 
            let result = await Item.find(itemQuery,{title:1, created_at:1, updated_at:1, is_done:1}).lean();
            return result;
        }catch(error) {
            throw new httperror(error.status||500, error.message||"Internal server error");  
        }
    }
    
    async updateItem({update_obj, user_id, item_id}){
        try{
            let itemQuery ={
                _id: item_id,
                created_by: user_id 
            };
            let result = await Item.findOneAndUpdate(itemQuery,{$set:update_obj},{'new':true}).lean();
            if(!result)
                throw new httperror(400, "Item not found"); 
            return result;
        }catch(error) {
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }

    async deleteItem({item_id, user_id}){
        try{
            let itemQuery ={
                _id: item_id,
                created_by: user_id 
            };
            let result = await Item.deleteOne(itemQuery,{'new':true}).lean();
            if(result.deletedCount == 0)
                throw new httperror(400, "Item not found"); 
            return "Item deleted successfully";
        }catch(error) {
            throw new httperror(error.status||500, error.message||"Internal server error"); 
        }
    }
}

exports.ItemsRepository = ItemsRepository;


