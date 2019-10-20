# frozen_string_literal: true

class AccountsController < ApplicationController
  def index
    render json: Account.all
  end
end
