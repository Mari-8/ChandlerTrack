class Recipe{
    static all = [] 

    constructor(name, description, id) {
        this.id = id
        this.name = name 
        this.description = description 
        this.element = document.createElement('div')
        this.element.id = `recipe-${this.id}`

        Recipe.all.push(this)
    }
    
    static findById(id){
        return Recipe.all.find(item => item.id == id)
    }

    get recipeList() {
        return document.getElementById('rec-list')
    }


    addEventListeners(){
        this.element.addEventListener('click', this.handleRecipeSelect)
    }

    handleRecipeSelect = (e) => {
        let id = e.target.dataset.id
        if (e.target.className === "edit"){
            this.renderEditForm(this.id)
        } else if (e.target.className === "delete"){
            recipesAdapter.deleteRec(id)
        } else if (e.target.className === "view") {
            this.viewRecipe(id) 
        }
    }
    

    renderRecipe() {
        this.element.innerHTML = `
        <div class="rec-container">
            <div class="item rec-info">
                <strong class="name">${this.name}</strong>:
                <span class="description">${this.description}</span>
            </div>
            <div class="recipe-buttons" id="item rec-buttons">
                <button class="edit" data-id="${this.id}">Edit</button>
                <button class="delete" data-id="${this.id}">Delete</button>
                <button class="view" id="view-recipe" data-id="${this.id}">View</button>
            </div>
        </div>
        <br>
        `
     
        return this.element
    }

    attachToDom() {
        this.recipeList.append(this.renderRecipe())
        this.addEventListeners()
    }

    newRecipeForm() {
        const recList = document.getElementById('rec-list')
        const newRecipeForm = document.createElement('div') 
        newRecipeForm.innerHTML = `
        <form id="recipe-form">
        <h3>Add New Recipe</h3>
        <label for="recipe-name">Name:</label>
        <input type="text" name="name" id="recipe-name"><br><br>
        <label for="recipe-description">Description:</label>
        <input type="text" name="description" id="recipe-description"><br><br>
        <input type="submit" value="Create">
        </form>
        `
        recList.textContent = ''
        newRecipeForm.addEventListener("submit", recipesAdapter.handleRecForm)
        recList.appendChild(newRecipeForm)
    }

    renderEditForm(recId) {
        const recList = document.getElementById('rec-list')
        const editRecipeForm = document.createElement('div')
        editRecipeForm.innerHTML = `
        <form id="edit-recipe-form" onsubmit="event.preventDefault();">
        <h3>Edit Recipe</h3>
        <label for="recipe-name">Name:</label>
        <input type="text" name="name" id="recipe-name"><br><br>
        <label for="recipe-description">Description:</label>
        <input type="text" name="description" id="recipe-description"><br><br>
        <input type="submit" value="Update">
        </form>
        `

        recList.textContent = ''
        editRecipeForm.addEventListener("submit", function(e) {
            e.preventDefault()
            recipesAdapter.updateRec(recId)
        })
        recList.appendChild(editRecipeForm)
        
    }

    addIngredientToDom(ingr) {
        const ingredientList = document.getElementById("recipe-ingredient-list")
        let newLi = document.createElement('li')
        let ingredient = Ingredient.findById(ingr.id)
        let divElement = ingredient.element
        divElement.innerHTML = `
        <h5>${ingr.name}</h5>
        <h5>${ingr.amount} oz</h5>
        `
        newLi.appendChild(divElement)
        ingredientList.appendChild(newLi)
    }

    addIngredients() {
        let ingredientsAdapter = new IngredientsAdapter
        let ingredients = ingredientsAdapter.fetchRecipeIngredients(this.id)
        if (ingredients) {
            ingredients.map(ingr => this.addIngredientToDom(ingr))
        }
    }

    addNoteToDom(note) {
        const recNotesDiv = document.getElementsByClassName('recipe-notes')[0]
        let divElement = note.element
        divElement.innerHTML = `
        <h5>${note.note_body}<h5>
        `

        recNotesDiv.appendChild(divElement)
    }

    addNotes() {
        let notesAdapter = new NotesAdapter 
        let notes = notesAdapter.fetchRecipeNotes(this.id)
        if (notes) {
            notes.map(note => this.addNoteToDom(note))
        }
    }

   

  
    viewRecipe(id) {
        const recId = id
        const ingredient = new Ingredient
        const note = new Note
        const mainHeader = document.getElementById('main-head')
        const mainBody = document.getElementById('main-body')
        const recipeInfo = document.createElement('div')
        const recNotes = document.createElement('div')
        const newIngrButton = document.getElementById('new-ingr-button-container')
        const newNoteButton = document.getElementById('new-note-button-container')
        recipeInfo.className = "recipe-info"
        recNotes.className = "recipe-notes" 
        const recipe = Recipe.findById(recId)
        mainBody.innerText = ''
        mainHeader.innerHTML = `<h1>${recipe.name}</h1>`
        recipeInfo.innerHTML = `
            <h2>Ingredients</h2>
            <br>
            <p id="recipe-id" class="recipe-id" hidden="true">${recId}</p>
            <ul class="recipe-ingredient-list" id="recipe-ingredient-list">
                
            </ul>
        `       
        

        recNotes.innerHTML = `
   
            <h2>Notes</h2>
            <br>
            <ul class="recipe-notes-list" id="recipe-notes-list">

            </ul>
      
        `
        newIngrButton.innerHTML = `
            <button class="new-ingr-button" id="new-ingr-button" type="button">Add ingredient</button>
        `
        
        newNoteButton.innerHTML = `
            <button class="new-note-button" id="new-note-button" type="button">Add note</button>
        `
        ingredient.addEventListener()
        note.addEventListener()
        mainBody.appendChild(recipeInfo) 
        mainBody.appendChild(recNotes)
        recipe.addIngredients() 
        recipe.addNotes()

    }
 
  
}

