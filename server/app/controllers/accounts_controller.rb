# frozen_string_literal: true

class AccountsController < ApplicationController
  before_action :set_account, only: %i[show edit update destroy]

  def index
    render json: Account.all
  end

  def show
    render json: @account
  end

  def create
    @account = Account.new(account_params)
    @account.save

    render json: @account
  end

  def update
    @account.update(account_params)

    render json: @account
  end

  def destroy
    @account.destroy

    render json: @account
  end

  private

  def set_account
    @account = Account.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:username, :email)
  end
end
