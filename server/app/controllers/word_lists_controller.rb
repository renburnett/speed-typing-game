class WordListsController < ApplicationController
  def index
    render json: WordList.all
  end 
end
