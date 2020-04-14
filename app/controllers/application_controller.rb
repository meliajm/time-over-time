class ApplicationController < ActionController::API
    helper_method :current_user, :logged_in?

    def current_user
        User.find(session[:user_id])
    end

    def logged_in?
        !!session[:user_id]
    end
end
