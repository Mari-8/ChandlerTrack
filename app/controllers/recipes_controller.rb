class RecipesController < ApplicationController

    def show 
        recipe = Recipe.find_by(id: params[:id])
        options = {
            include: [:inventoryItems, :notes]
        }
        render json: RecipeSerializer.new(recipe, options)
    end 

end
