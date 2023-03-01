class TodoController < Sinatra::Base
    get '/todos' do
    "Todo"
    todos = Todo.all

    json todos
end
end