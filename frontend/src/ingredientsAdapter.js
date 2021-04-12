class IngredientsAdapter{
    constructor() {
        this.normUrl = 'http://localhost:3000/ingredients'
    }

    fetchRecipeIngredients(recId){
        fetch(this.normUrl)
        .then(res => res.json())
        .then(response => {
            let recipe = Recipe.findById(recId)
            recipe.ingredients.clear
            response.data.forEach(res => {
                let ingredient = new Ingredient
                ingredient.id = res.id 
                ingredient.name = res.attributes.name 
                ingredient.recipe_id = res.relationships.recipe.data.id 
                ingredient.amount = res.attributes.amount
                ingredient.element = document.createElement('div')
                ingredient.element.id = `recipe-${res.id}`
                
                if (ingredient.recipe_id == recId) {
                    recipe.ingredients.push(ingredient)
                    recipe.addIngredientToDom(ingredient)
                } else {
                    if (Ingredient.all.includes(ingredient)) {
                        console.log("already in")
                    } else {
                        Ingredient.all.push(ingredient)
                    }

                }
            })
            
        })
        
    }


    addIngredient(ingrObj) {
        const recipe =  Recipe.findById(ingrObj['recipe_id'])
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(ingrObj)
        }

        fetch('http://localhost:3000/ingredients', configObj)
        .then(res => res.json())
        .then(json => {
            let ingredient = new Ingredient(json.id, json.name, json.recipe_id)
            ingredient.element = document.createElement('div')
            ingredient.element.id = `ingredient-${ingredient.id}`
           
            recipe.ingredients.push(ingredient)
            recipe.viewRecipe(ingredient.recipe_id) 
        })
    }
}