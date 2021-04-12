class IngredientsController < ApplicationController

    def index 
        ingredients = Ingredient.all 

        options = {
            include: [:recipe, :inventory_item]
        }
        render json: IngredientSerializer.new(ingredients, options)
    end 

    def show 
        ingredient = Ingredient.find_by(id: params[:id])

        options = {
            include: [:recipe, :inventory_item]
        }
        render json: IngredientSerializer.new(ingredient, options)
    end 

    def create 
        ingredient = Ingredient.new(ingredient_params)

        if ingredient.save 
            render json: ingredient.to_json(:include => {
            :recipe => {:only => [:recipe_id, :name, :ingredients]}
        })
        else 
            render json: {error: "Could not create ingredient"} 
        end 
    end 

    def destroy 
        ingredient = Ingredient.find(params[:id])
        ingredient.destroy 
        render json: {message: "Succesfully deleted ingredient"}
    end 

    def update 
        ingredient = Ingredient.find(params[:id])
        ingredient.update(ingredient_params)
        render json: {message: "Updated ingredient"}
    end 

    private 

    def ingredient_params 
        params.require(:ingredient).permit(:recipe_id, :name, :amount)
    end 
end
