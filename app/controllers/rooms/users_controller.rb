class Rooms::UsersController < ApplicationController
  before_action :set_room
  before_action :set_user, only: %i[ show ]

  def index
    @users = @room.users
    respond_to do |format|
      format.html
      format.json { render json: @users.to_json, status: :ok }
    end
  end

  def show
  end

  private
    def set_user
      @message = @room.users.find(params[:id])
    end

    def set_room
      @room = current_user.rooms.find(params[:room_id])
    end
end
