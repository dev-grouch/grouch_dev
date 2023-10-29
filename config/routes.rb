Rails.application.routes.draw do
  resources :contact, only: [:create]

  root "home#index"
end
