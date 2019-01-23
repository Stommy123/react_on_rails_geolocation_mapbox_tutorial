class ApplicationController < ActionController::Base
  before_action :unset_location, if: :signing_out?
  before_action :authenticate_user!

  private

  def signing_out?
    devise_controller? &&
    controller_name == 'sessions' &&
    action_name == 'destroy'
  end

  def unset_location
    current_user.update(latitude: nil, longitude: nil)
  end
end
