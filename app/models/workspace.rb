class Workspace < ApplicationRecord
  has_many :users
  has_many :personal_workspaces
end
