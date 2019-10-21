class Account < ApplicationRecord
  has_many :runs, dependent: :destroy
end