Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'

  root 'sources#index'

  resources :sources do
    member do
      post :preview
    end
    resources :queries
  end
end
