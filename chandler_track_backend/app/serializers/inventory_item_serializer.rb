class InventoryItemSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :name, :measurement, :amount
  
end
