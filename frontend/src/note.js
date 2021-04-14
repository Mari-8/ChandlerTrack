class Note {
    static all = [] 

    constructor(id, note_body, recipe_id) {
        this.id = id
        this.note_body = note_body 
        this.recipe_id = recipe_id 
        this.element = document.createElement('div')
        this.element.id = `note-${this.id}`

        Note.all.push(this)
    }

    static findById(id){
        return Note.all.find(note => note.id == id)
    }

    addEventListener() {
        const newNoteButton = document.getElementById('new-note-button-container')
        newNoteButton.addEventListener("click", this.renderNewNoteForm)
    }

    renderNewNoteForm() {
        const recNotesDiv = document.getElementsByClassName('recipe-notes')[0]
        const note = new Note
        let recId = document.getElementsByClassName('recipe-id')[0].innerText
        recId = parseInt(recId, 10)
        const noteInfo = document.createElement('div')
        noteInfo.className = "recipe-notes"

        noteInfo.innerHTML = `
        <h2>Notes</h2> 
        <br>
        <form id="new-note-form">
        <h3>Add Note</h3>
        <label for="note_body" >Note:</label>
        <input type="text-field" name="note-body" id="note-body"><br><br>
        <input type="submit" id="new-note-button" value="Add note">
        </form>
        `
        recNotesDiv.innerHTML = ''
        recNotesDiv.appendChild(noteInfo)
        const noteButton = document.getElementById('new-note-button')
        noteButton.addEventListener("click", function(e) {
            e.preventDefault()
            note.handleAddNote(recId)
        })
    }

    handleAddNote(recId) {
        const noteBody = document.getElementById('note-body').value
        const notesAdapter = new NotesAdapter

        let noteObject = {
            note_body: noteBody,
            recipe_id: recId
        }

        notesAdapter.addNote(noteObject)
    }
}