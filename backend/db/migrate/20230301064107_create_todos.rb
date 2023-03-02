class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.boolean :completed, defatlt: false
      t.string :category
      t.timestamps
    end
  end
end
