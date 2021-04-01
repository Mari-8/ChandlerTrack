class NotesController < ApplicationController
    
    def show 
        note = Note.find_by(id: params[:id])
        render json: NoteSerializer.new(note) 
    end 

    def index 
        notes = Note.all 
        render json: NoteSerializer.new(notes) 
    end 

    def create 
        note = Note.new(note_params) 

        if note.save 
            render json: NoteSerializer.new(note)
        else 
            render json: {error: "There was a problem creating this note"}
        end 
    end 

    def destroy 
        note = Note.find(params[:id])
        note.destroy 
        render json: {message: "Successfully deleted note"}
    end 

    def update 
        note = Note.find(params[:id]) 
        note.update(note_params) 
        render json: {message: "Successfully updated note"}
    end 

    private 

    def note_params 
        params.require(:note).permit(:note, :description, :amount)
    end 
end
