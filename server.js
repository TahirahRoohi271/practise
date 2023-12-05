const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // Import the path module

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample data
let todoList = [
  { id: 1, task: 'Buy groceries' },
  { id: 2, task: 'Finish project' },
];

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// API endpoint to get the todo list
app.get('/api/todos', (req, res) => {
  res.json(todoList);
});

// API endpoint to add a new task to the todo list
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todoList.length + 1, task };
  todoList.push(newTodo);
  res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = todoList.findIndex(todo => todo.id === taskId);

  if (index !== -1) {
    todoList[index].task = req.body.task;
    res.json(todoList[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = todoList.findIndex(todo => todo.id === taskId);

  if (index !== -1) {
    const deletedTask = todoList.splice(index, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
