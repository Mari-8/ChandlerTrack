class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :note_body
      t.integer :recipe_id

      t.timestamps
    end
  end
end
