class InventoryItemsController < ApplicationController

    def show 
        inventoryItem = InventoryItem.find_by(id: params[:id])
        options = {
            include: [:recipes, :ingredients]
        }
        render json: InventoryItemSerializer.new(inventoryItem, options)
    end 

    def index 
        inventoryItems = InventoryItem.all 
        options = {
            include: [:recipes, :ingredients]
        }
        render json: InventoryItemSerializer.new(inventoryItems)
    end 

    def create 
        inventoryItem = InventoryItem.new(inventoryItem_params)

        if inventoryItem.save 
           render json: InventoryItemSerializer.new(inventoryItem) 
        else 
            render json: {error: "There was a problem creating this item"}
        end 
    end 

    def destroy 
        inventoryItem = InventoryItem.find(params[:id])
        inventoryItem.destroy
        render json: {message: "Succesfully deleted item"}
    end 

    def update 
        inventoryItem = InventoryItem.find(params[:id]) 
        inventoryItem.update(inventoryItem_params) 
        render json: {message: "Succesfully updated item"}
    end 


    private 

    def inventoryItem_params
        params.require(:inventory_item).permit(:name, :description, :amount)
    end 
end
