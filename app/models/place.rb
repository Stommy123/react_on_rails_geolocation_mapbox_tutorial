class Place < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  geocoded_by :address
  after_validation :geocode
  has_one_attached :image

  def address
    [street, city, state, country].compact.join(', ')
  end

end
