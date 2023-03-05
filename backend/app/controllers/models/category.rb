class Category <ActiveRecord::Base
  attr_accessor :category
  has_many :todos
end