class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.string :receiver_type
      t.integer :reply_to
      t.text :content

      t.timestamps
    end
  end
end
