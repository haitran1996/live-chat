Rails.application.routes.draw do
  devise_scope :user do
    get "sign_in", to: "sessions/sessions#new"
  end
  devise_for :users

  resources :dash_board, only: %i[index]

  root to: 'dash_board#index'
end
