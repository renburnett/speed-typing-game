class WordBanksController < ApplicationController
  def index
    render json: WordBank.all
  end 
end
