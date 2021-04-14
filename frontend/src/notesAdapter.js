class NotesAdapter {

    constructor() {
        this.normUrl = 'http://localhost:3000/notes'
    }

    fetchRecipeNotes(recId){
        fetch(this.normUrl)
        .then(res => res.json())
        .then(response => {
            let recipe = Recipe.findById(recId)
            recipe.notes = []
            response.data.forEach(res => {
                let note = new Note
                note.note_body = res.attributes.note_body
                note.id = res.id 
                note.recipe_id = res.relationships.recipe.data.id 
                note.element = document.createElement('div')
                note.element.id = `note-${res.id}`
                
                if (note.recipe_id == recId) {
                    recipe.notes.push(note)
                    recipe.addNoteToDom(note)
                } else {
                    if (Note.all.includes(note)) {
                        return "already in"
                    } else {
                        Note.all.push(note)
                    }

                }
            })
            
        })
        
    }


    addNote(noteObject) {
        const recipe =  Recipe.findById(noteObject['recipe_id'])
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(noteObject)
        }

        fetch('http://localhost:3000/notes', configObj)
        .then(res => res.json())
        .then(json => {
            let note = new Note
            note.id = json.data.id 
            note.note_body = json.data.attributes.note_body
            note.recipe_id = json.data.relationships.recipe.data.id
            
            let recipe = Recipe.findById(note.recipe_id)
            recipe.notes.push(note)
            recipe.viewRecipe(note.recipe_id) 
        })

    }
}