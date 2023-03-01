class TodoController < Sinatra::Base
    get '/todos' do
    "Todo"
    todos = Todo.all

    json todos
end
post '/todos' do
    title = params[:title]
    description = params[:description]
    category_id = params[:category_id]
  
    todo = Todo.create(title: title, description: description, category_id: category_id)
  
    if todo.valid?
      status 201
      json todo
    else
      status 422
      json error: todo.errors.full_messages.to_sentence
    end
  end
end