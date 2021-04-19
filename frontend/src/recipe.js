class Recipe{
    static all = [] 

    constructor(name, description, id) {
        this.id = id
        this.name = name 
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
                <p class="box-text">${this.name}</p><br><br>
            </div>
            <div class="recipe-buttons" id="item rec-buttons">
            <button class="view" id="view-recipe" data-id="${this.id}">View</button>
                <button class="edit" data-id="${this.id}">Edit</button><br>
                <button class="delete" data-id="${this.id}">Delete</button><br>
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
        <input class="button" type="submit" value="Create">
        </form>
        `
        recList.textContent = ''
        newRecipeForm.addEventListener("submit", recipesAdapter.handleRecForm)
        recList.appendChild(newRecipeForm)
    }

    renderEditForm(recId) {
        const recipe = Recipe.findById(recId)
        const recList = document.getElementById('rec-list')
        const editRecipeForm = document.createElement('div')
        editRecipeForm.innerHTML = `
        <form id="edit-recipe-form">
        <h3>Edit Recipe</h3>
        <label for="recipe-name">Name:</label>
        <input type="text" name="name" id="recipe-name" value="${recipe.name}"><br><br>
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
        const deleteButton = document.getElementsByClassName('ing-delete-btn')
        let divElement = ingredient.element
        divElement.innerHTML = `
        <div id="ing-${ingr.id}" class="ingredient-display-box">
            <h5> ${ingr.name} - ${ingr.amount} ${ingr.measurement} </h5>
            <div class="outer">
                 <div class="inner">
                   <label class="ing-delete-btn" id="${ingr.id}">Delete</label>
                </div>
            </div>
        </div>
        `
        newLi.appendChild(divElement)
        ingredientList.appendChild(newLi)
    }
    
    addIngListener() {
        let ingredientsAdapter = new IngredientsAdapter
        let deleteIngButtons = document.querySelectorAll('.ing-delete-btn') 
        deleteIngButtons.forEach((btn) => { btn.addEventListener("click", (e) => { ingredientsAdapter.deleteIng(e.target.id); }); });
    }

    addNoteListener() {
        let notesAdapter = new NotesAdapter 
        let deleteNoteButtons = document.querySelectorAll('.note-delete-btn')
        deleteNoteButtons.forEach((btn) => { btn.addEventListener("click", (e) => { notesAdapter.deleteNote(e.target.id); }); });
    }



    addIngredients() {
        let ingredientsAdapter = new IngredientsAdapter
        let ingredients = ingredientsAdapter.fetchRecipeIngredients(this.id)
        if (ingredients) {
            ingredients.map(ingr => this.addIngredientToDom(ingr))
        }
    }

    addNoteToDom(note) {
        const recNotesDiv = document.getElementsByClassName('recipe-notes-list')[0]
        let divElement = note.element
        divElement.innerHTML = `
        <div id="note-${note.id}" class="note-display-box"> 
            <h5 class="note-body">${note.note_body}<h5>
            <div class="outer-2">
                <div class="inner-2">
                    <label class="note-delete-btn" id="${note.id}">Delete</label>
                </div>
            </div>
            </div>
        <p class="push-left">_______________________</p>
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
        const recipe = Recipe.findById(recId)
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
        mainBody.innerText = ''
        mainHeader.innerHTML = `
        <h2>${recipe.name}</h2>
        `

        recipeInfo.innerHTML = `
            <h1>Ingredients</h1>
            <br>
            <p id="recipe-id" class="recipe-id" hidden="true">${recId}</p>
            <ul class="recipe-ingredient-list" id="recipe-ingredient-list">
                
            </ul>
        `       
        

        recNotes.innerHTML = `
   
            <h1>Notes</h1>
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
        setTimeout(function(){ recipe.addNoteListener(); }, 500)
        setTimeout(function(){ recipe.addIngListener(); }, 500);
        

    }
 
  
}

