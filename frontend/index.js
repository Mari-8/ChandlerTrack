const recipesAdapter = new RecipesAdapter
const recipe = new Recipe
const inventoryItem = new InventoryItem
const inventoryItemsAdapter = new InventoryItemsAdapter
const newRecipeButton = document.getElementById('add-recipe-button')
const newInventoryItemButton = document.getElementById("add-item-button")

document.addEventListener('DOMContentLoaded', () => {
    inventoryItemsAdapter.fetchInventoryItems()
    recipesAdapter.fetchRecipes()
    newRecipeButton.addEventListener("click", recipe.newRecipeForm)
    newInventoryItemButton.addEventListener("click", inventoryItem.newItemForm)
    
    
})
