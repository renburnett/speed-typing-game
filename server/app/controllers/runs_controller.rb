class RunsController < ApplicationController
  before_action :set_account, only: %i[create update]
  before_action :set_run, only: %i[show update]

  def index
    render json: Run.all
  end

  def show
    render json: @run
  end

  def create
    @run = Run.new(run_params)
    @run.account = @account

    @run.save

    render json: @run
  end

  def update
    @run.update(run_params)

    render json: @run
  end

  private

  def set_account
    @account = Account.find(params[:account_id])
  end

  def set_run
    @run = Run.find(params[:id])
  end

  def run_params
    params.require(:run).permit(:account_id, :score, :words_seen, :words_typed)
  end
end
