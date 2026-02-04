import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({ message: 'Hello from backend!' })
})

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ])
})

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: Date.now() })
})

app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})
