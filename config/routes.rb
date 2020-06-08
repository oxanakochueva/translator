Rails.application.routes.draw do
  resources :personal_workspaces
  devise_for :users
  authenticated :user do
    root 'personal_workspaces#index', as: :authenticated_root
  end
  resources :workspaces
  root 'workspaces#index'
  post 'translate/translate'
  get 'translate/translate'
  post 'translate/dictionary'
  get 'translate/dictionary'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
