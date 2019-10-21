class CreateRuns < ActiveRecord::Migration[6.0]
  def change
    create_table :runs do |t|
      t.references :account, null: false, foreign_key: true
      t.integer :score
      t.string :words_typed
      t.string :words_seen

      t.timestamps
    end
  end
end
