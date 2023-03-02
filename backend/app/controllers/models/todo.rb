class Todo <ActiveRecord::Base
  belongs_to :category
 validates :title, presence: true
 validates :category, presence: true

  def as_json(options={})
    super(only: [:id, :title, :description ,:completed],
    include: { category: { only: [:name] } })
  end
end