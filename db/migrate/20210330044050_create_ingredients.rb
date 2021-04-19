class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.float :amount
      t.string :measurement
      t.belongs_to :recipe
      

      t.timestamps
    end
  end
end
