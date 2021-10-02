class Room < ApplicationRecord
  extend Enumerize

  enumerize :status, in: %w[public private], scope: true, predicates: { prefix: true }

  has_many :messages, as: :receiver
  has_many :assignments
  has_many :users, through: :assignments

  accepts_nested_attributes_for :assignments
end
