class NoteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :note
  belongs_to :recipe
end 
