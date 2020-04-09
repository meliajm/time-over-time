class Category < ApplicationRecord
    has_many :tasks
    # validates :name, presence: true#, uniqueness: true
    validates :name, inclusion: { in: ['Physical Health', 'Mental Health', 'Emotional Health', 'Chores',
                                        'Errands', 'Learning!', 'Relaxing', 'Working'] }

end