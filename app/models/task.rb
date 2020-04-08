class Task < ApplicationRecord
    belongs_to :category
    validates_presence_of :by_when, :content

    def get_date
        created_at.strftime('%m/%d/%Y')
        # t.strftime("Printed on %m/%d/%Y") 
    end

end
