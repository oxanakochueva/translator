class CreatePersonalWorkspaces < ActiveRecord::Migration[6.0]
  def change
    create_table :personal_workspaces do |t|
      t.integer :user_id

      t.timestamps
    end
  end
end
