class IngredientSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :amount, :measurement
  belongs_to :recipe 
end
