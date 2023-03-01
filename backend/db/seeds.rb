# seeds for the categories table
Category.create(name: 'Personal')
Category.create(name: 'Work')
Category.create(name: 'Shopping')

# seeds for the todos table 
personal = Category.find_by(name: 'Personal')
work = Category.find_by(name: 'Work')
shopping = Category.find_by(name: 'Shopping')

Todo.create(title: 'Buy groceries', description: 'Milk, bread, eggs', category: shopping)
Todo.create(title: 'Finish report', description: 'Write summary and recommendations', category: work)
Todo.create(title: 'Go for a run', description: '5 miles', category: personal)
Todo.create(title: 'Clean the house', description: 'Vacuum and dust', category: personal)
Todo.create(title: 'Prepare for meeting', description: 'Review slides and notes', category: work)
