module RoomsHelper
  def room_props(room)
    room.attributes.merge(
      current_user: current_user
    )
  end
end
