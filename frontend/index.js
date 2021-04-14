const recipesAdapter = new RecipesAdapter
const recipe = new Recipe
const newRecipeButton = document.getElementById('add-recipe-button')

document.addEventListener('DOMContentLoaded', () => {
    
    recipesAdapter.fetchRecipes()
    newRecipeButton.addEventListener("click", recipe.newRecipeForm)
    
    
})
