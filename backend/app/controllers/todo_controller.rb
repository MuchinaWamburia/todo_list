class TodoController < Sinatra::Base

  # GET /todos - Get all todos
  get '/todos' do
    category = params[:category]
    if category
      todos = Todo.where(category: category)
    else
      todos = Todo.all
    end
    todos.to_json
  end
  # GET /todos/:id - Get a specific todo
  get '/todos/:id' do
    todo = Todo.find(params[:id])
    todo.to_json
  end
  
   # POST /todos - Create a new todo
    post '/todos' do
    request_body = JSON.parse(request.body.read)
    todo = Todo.create(request_body)
    if todo.save
    todo.to_json
    else
      status 400
      {error: todo.errors.full_messages}.to_json    
  end
  end
  
    # PUT /todos/:id - Update a todo
  put '/todos/:id' do
    request_body = JSON.parse(request.body.read)
    todo = Todo.find(params[:id])
    if todo.update(request_body)
      todo.to_json
    else
      status 400
      { error: todo.errors.full_messages }.to_json
    
    end
  end

  # DELETE /todos/:id - Delete a todo  
  delete '/todos/:id' do
    todo = Todo.find(params[:id])
    todo.destroy
    status 204
  end
  
  
end
