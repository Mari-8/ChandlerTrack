Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :recipes 
  resources :inventory_items
  resources :ingredients
  resources :notes
end
