class CreateWordBanks < ActiveRecord::Migration[6.0]
  def change
    create_table :word_banks do |t|
      t.string :word
      t.integer :length

      t.timestamps
    end
  end
end
