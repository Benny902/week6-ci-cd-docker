const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const blogs = [];

// GET /
app.get('/', (req, res) => {
  res.send('Microblog Backend API running!');
});

// GET /blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

// POST /blogs
app.post('/blogs', (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const newBlog = {
      id: blogs.length + 1,
      text,
      timestamp: new Date().toISOString() // Add timestamp
    };
    blogs.push(newBlog);
    res.status(201).json(newBlog);
  });  

// DELETE /blogs/:id
app.delete('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogs.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  blogs.splice(index, 1);
  res.status(204).send();
});

// PUT /blogs/:id
app.put('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const blog = blogs.find(b => b.id === id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  blog.text = text;
  res.json(blog);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
