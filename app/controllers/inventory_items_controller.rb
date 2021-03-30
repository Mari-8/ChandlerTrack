class InventoryItemsController < ApplicationController

    def show 
        inventoryItem = InventoryItem.find_by(id: params[:id])
        options = {
            include: [:recipes]
        }
        render json: InventoryItemSerializer.new(inventoryItem, options)
    end 
end
