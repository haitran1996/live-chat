Rails.application.routes.draw do
  devise_scope :user do
    get "sign_in", to: "sessions/sessions#new"
  end
  devise_for :users

  resources :dash_board, only: %i[index]
  resources :rooms do
    resources :messages, module: :rooms, format: :json
    resources :users, module: :rooms, format: :json
  end
  resources :assignments

  root to: 'rooms#index'
end
