Rails.application.routes.draw do
  resources :users
  # resources :tasks
  resources :categories
  resources :tasks#, only: [:index, :new, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
