class InventoryItemSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :name, :description, :amount
  has_many :ingredients
  has_many :recipes, through: :ingredients
end
