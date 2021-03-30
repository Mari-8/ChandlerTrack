class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.belongs_to :recipe 
      t.belongs_to :inventoryItem

      t.timestamps
    end
  end
end
