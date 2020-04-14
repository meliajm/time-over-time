class Task < ApplicationRecord
    belongs_to :category
    validates_presence_of :content, :category#, :by_when

    def get_date
        created_at.strftime('%m/%d/%Y')
        # t.strftime("Printed on %m/%d/%Y") 
    end

    def self.order_task_by_newest
        order(id: :desc)
    end

end
