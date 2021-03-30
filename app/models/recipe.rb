class Recipe < ApplicationRecord
    has_many :notes 
    has_many :ingredients 
    has_many :notes
    has_many :inventoryItems, through: :ingredients 
end
