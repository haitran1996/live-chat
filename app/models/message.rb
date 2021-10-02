class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, polymorphic: true

  def time_ago_in_words
    ActionController::Base.helpers.time_ago_in_words(created_at) + ' ago'
  end
end
