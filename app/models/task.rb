class Task < ApplicationRecord
    belongs_to :category
    validates_presence_of :by_when, :content
end
