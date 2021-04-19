class Ingredient{
    static all = [] 

    constructor(id, name, recipe_id, amount, measurement) {
        this.id = id
        this.name = name 
        this.measurement = measurement
        this.recipe_id = recipe_id 
        this.amount = amount
        this.element = document.createElement('div')
        this.element.id = `ingredient-${this.id}`
       
        Ingredient.all.push(this)
    }

    static findById(id){
        return Ingredient.all.find(ing => ing.id == id)
    }

    addEventListener() {
        const newIngrButton = document.getElementById('new-ingr-button-container')
        newIngrButton.addEventListener("click", this.renderNewIngrForm)
    }

    renderNewIngrForm() {
        const mainBody = document.getElementById('main-body')
        const ingredient = new Ingredient
        let recId = document.getElementsByClassName('recipe-id')[0].innerText
        recId = parseInt(recId, 10)
        const recipeInfo = document.createElement('div')

        recipeInfo.innerHTML = `
        <form id="new-ingredient-form">
        <h3>Add ingredient</h3>
        <label for="ingredient-name">Name:</label>
        <input type="text" name="name" id="ingredient-name"><br><br>
        <label for="ingredient-amount">Amount: </label> 
        <input type="number" name="amount" id="ingredient-amount"><br><br>
        <label for="ingredient-measurement">Measurement:</label> 
        <select for="ingredient-measurement" id="ingredient-measurement"> 
            <option>lbs</option>
            <option>oz</option>
            <option>units</option> 
        </select><br><br>
        <input type="submit" id="new-ingr-button" value="Add">
        </form>
        `
        mainBody.innerHTML = ''
        mainBody.appendChild(recipeInfo)
        const ingrButton = document.getElementById('new-ingr-button')
        ingrButton.addEventListener("click", function(e) {
             e.preventDefault()
             ingredient.handleAddIngredient(recId)
        })
    }

    handleAddIngredient(recId) {
        const recipe = Recipe.all.find(rec => rec.id == recId)
        const name = document.getElementById('ingredient-name').value
        const amount = document.getElementById('ingredient-amount').value
        const measurement = document.getElementById('ingredient-measurement').value
        const ingredientsAdapter = new IngredientsAdapter

        let ingrObject = {
            name: name,
            recipe_id: recipe.id,
            amount: amount,
            measurement: measurement
        }

        ingredientsAdapter.addIngredient(ingrObject)
    }

}