class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description 
  has_many :notes 
  has_many :ingredients 
  has_many :inventory_items, through: :ingredients 
end
