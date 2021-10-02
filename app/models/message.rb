class Message < ApplicationRecord
  # belongs_to :sender, polymorphic: true
  belongs_to :receiver, polymorphic: true

  def time_ago_in_words
    ActionController::Base.helpers.time_ago_in_words(created_at) + ' ago'
  end
end
