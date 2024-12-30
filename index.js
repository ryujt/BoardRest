const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
app.use(express.json())
const PORT = 3000
const DATA_FILE = path.join(__dirname, 'posts.jsonl')

function readPosts() {
  if (!fs.existsSync(DATA_FILE)) {
    return []
  }
  const data = fs.readFileSync(DATA_FILE, 'utf8').trim()
  if (!data) {
    return []
  }
  return data.split('\n').map(line => JSON.parse(line))
}

function writePosts(posts) {
  const data = posts.map(p => JSON.stringify(p)).join('\n')
  fs.writeFileSync(DATA_FILE, data)
}

app.get('/posts', (req, res) => {
  const posts = readPosts()
  res.json(posts)
})

app.post('/posts', (req, res) => {
  const posts = readPosts()
  const newPost = {
    id: Date.now().toString(),
    title: req.body.title || '',
    content: req.body.content || '',
    createdAt: new Date().toISOString()
  }
  posts.push(newPost)
  writePosts(posts)
  res.json(newPost)
})

app.get('/posts/:id', (req, res) => {
  const posts = readPosts()
  const post = posts.find(p => p.id === req.params.id)
  if (!post) {
    return res.status(404).json({ error: 'Post not found' })
  }
  res.json(post)
})

app.put('/posts/:id', (req, res) => {
  const posts = readPosts()
  const index = posts.findIndex(p => p.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' })
  }
  posts[index].title = req.body.title || posts[index].title
  posts[index].content = req.body.content || posts[index].content
  writePosts(posts)
  res.json(posts[index])
})

app.delete('/posts/:id', (req, res) => {
  const posts = readPosts()
  const newPosts = posts.filter(p => p.id !== req.params.id)
  if (newPosts.length === posts.length) {
    return res.status(404).json({ error: 'Post not found' })
  }
  writePosts(newPosts)
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
