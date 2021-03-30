class CreateInventoryItems < ActiveRecord::Migration[6.1]
  def change
    create_table :inventory_items do |t|
      t.string :name
      t.string :description
      t.float :amount
      

      t.timestamps
    end
  end
end
