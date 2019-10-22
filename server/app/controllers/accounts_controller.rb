# frozen_string_literal: true

class AccountsController < ApplicationController
  def index
    render json: Account.all, include: [:runs]
  end
end
