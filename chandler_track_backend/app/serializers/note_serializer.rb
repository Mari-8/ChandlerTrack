class NoteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :note_body
  belongs_to :recipe
end 
