class TodoController < Sinatra::Base

  get '/todos' do
    category = params[:category]
    if category
      todos = Todo.where(category: category)
    else
      todos = Todo.all
    end
    todos.to_json
  end
  
  get '/todos/:id' do
    todo = Todo.find(params[:id])
    todo.to_json
  end
  
  
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
  
  delete '/todos/:id' do
    todo = Todo.find(params[:id])
    todo.destroy
    status 204
  end
  
  # Now, you can use any HTTP client (such as Postman or cURL) to interact with the API. 
  # GET /todos - Get all todos
  # GET /todos/:id - Get a specific todo
  # POST /todos - Create a new todo
  # PUT /todos/:id - Update a todo
  # DELETE /todos/:id - Delete a todo
 
  
  
  
  
end
