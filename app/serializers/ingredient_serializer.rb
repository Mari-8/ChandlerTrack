class IngredientSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :inventory_item 
  belongs_to :recipe 
end
