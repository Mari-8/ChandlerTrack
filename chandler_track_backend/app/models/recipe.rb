class Recipe < ApplicationRecord
    has_many :notes 
    has_many :ingredients 
    
end
