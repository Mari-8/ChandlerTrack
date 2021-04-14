class RecipesAdapter{
    constructor() {
        this.normUrl = 'http://localhost:3000/recipes'
    }

    fetchRecipes(){
        fetch(this.normUrl)
        .then(res => res.json())
        .then(response => {
            response.data.forEach(el => {
                let recipe = new Recipe
                recipe.id = el.id 
                recipe.name = el.attributes.name 
                recipe.description = el.attributes.description 
                recipe.ingredients = el.attributes.ingredients
                recipe.element.id = `recipe-${el.id}`
                recipe.attachToDom(el)
            })
        })
        
    }

    handleRecForm = (e) => {
        e.preventDefault()
        const adapter = new RecipesAdapter
        const recList = document.getElementById('rec-list') 
        const name = document.getElementById('recipe-name').value
        const description = document.getElementById('recipe-description').value
        const ingredients = document.getElementById('recipe-ingredients').value
    
        let newRecObject = {
            name: name,
            description: description,
            ingredients: ingredients
        }
    
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newRecObject)
        }
    
        fetch('http://localhost:3000/recipes', configObj)
        .then(res => res.json())
        .then(json => {
            let recipe = new Recipe 
            recipe.id = json.id 
            recipe.name = json.name 
            recipe.description = json.description 
            recipe.ingredients = json.ingredients
            recipe.element.id = `recipe-${json.id}`

            adapter.fetchRecipes() 
        })
    }

    updateRec(recId) {

        const name = document.getElementById('recipe-name').value
        const description = document.getElementById('recipe-description').value
        const ingredients = document.getElementById('recipe-ingredients').value
        
        let recipeObj = {
            name, 
            description, 
            ingredients
        }
        
        this.sendPatch(recId, recipeObj)
    }

    sendPatch(recId, recipeObj) {
        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(recipeObj)
        }

        fetch(this.normUrl + `/${recId}`, configObj)
        .then(res => res.json())
        .then(response => {
            document.getElementById('rec-list').textContent = ''
            this.fetchRecipes()
        })
    }

    deleteRec(recId) {
        
    
        let configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(this.normUrl + `/${recId}`, configObj)
        .then(res => res.json())
        .then(json => {
            alert(json.message)
        })
           
        Recipe.all = Recipe.all.filter(i => i.id != recId)
    
        let recipe = document.getElementById(`recipe-${recId}`)
        recipe.remove()
        
    }

    
}