class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :ingredients
  has_many :notes 
  has_many :ingredients 
end
