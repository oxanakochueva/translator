Rails.application.routes.draw do

  resources :workspaces
  root 'workspaces#index'
  post 'translate/translate'
  get 'translate/translate'
  post 'translate/dictionary'
  get 'translate/dictionary'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
