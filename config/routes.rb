Rails.application.routes.draw do
  resources :workspaces
  post 'translate/translate'
  get 'translate/translate'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
