import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// In-memory todos storage
const todos = []
let nextTodoId = 1

app.get('/', (req, res) => {
  res.json({ message: 'Hello from backend!' })
})

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ])
})

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { name, description, dueDate } = req.body
  const todo = {
    id: nextTodoId++,
    name,
    description,
    dueDate,
    createdAt: new Date().toISOString()
  }
  todos.push(todo)
  res.status(201).json(todo)
})

// List all todos
app.get('/api/todos', (req, res) => {
  res.json(todos)
})

// Delete a todo by id
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const index = todos.findIndex(t => t.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' })
  }
  todos.splice(index, 1)
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})
