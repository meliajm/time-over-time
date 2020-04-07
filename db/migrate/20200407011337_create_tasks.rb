class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.datetime :by_when
      t.text :content

      t.timestamps
    end
  end
end
