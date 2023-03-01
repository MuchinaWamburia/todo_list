class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |u|
      u.string :name
      u.timestamps
      end
  end
end
