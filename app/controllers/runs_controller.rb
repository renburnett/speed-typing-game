class RunsController < ApplicationController
  def index
    render json: Run.all
  end
end
