class RecipesController < ApplicationController

    def show 
        recipe = Recipe.find_by(id: params[:id])
        options = {
            include: [:inventory_items, :notes, :ingredients]
        }
        render json: RecipeSerializer.new(recipe, options)
    end 

    def index 
        recipes = Recipe.all
        options = {
            include: [:inventory_items, :notes]
        }
        render json: RecipeSerializer.new(recipes)
    end 

    def create 
        recipe = Recipe.new(recipe_params) 
      
        if recipe.save 
            render json: recipe.to_json(:include => {
            :notes => {:only => [:note]},
            :ingredients => {:only => [:id, :name, :amount]}
        })
        else 
            render json: {error: "There was a problem creating this recipe"}
        end 
    end 

    def destroy 
        recipe = Recipe.find(params[:id])
        recipe.destroy
        render json: {message: "Successfully deleted recipe"}
    end 

    def update 
        recipe = Recipe.find(params[:id]) 
        recipe.update(recipe_params) 
        render json: {message: "Successfully updated recipe"}
    end 

    private 

    def recipe_params 
        params.require(:recipe).permit(:name, :ingredients)
    end 

end
