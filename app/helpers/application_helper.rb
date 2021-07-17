module ApplicationHelper
  def toast_props
    notifications = []
    toast_type = { notice: 'success', warning: 'warning', alert: 'error' }
    flash.keys.each do |type|
      next if %i[notice warning alert].exclude? type.to_sym
      notifications << { message: flash[type], type: toast_type[type.to_sym] }
    end
    notifications
  end
end
