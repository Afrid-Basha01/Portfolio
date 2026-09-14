const express = require('express');
const cors = require('cors');
require('dotenv').config();

const projectsData = require('./data/projects');

// In-memory array to store contact submissions
const contactSubmissions = [];

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// This tells Express to serve any files in the 'public' folder as static assets
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get('/api/projects', (req, res) => {
  // We format the image paths to include the full server URL 
  // e.g., "http://localhost:5000/images/securevault.jpg"
  const formattedProjects = projectsData.map(project => ({
    ...project,
    image: `${req.protocol}://${req.get('host')}${project.image}`
  }));
  
  res.status(200).json(formattedProjects);
});

app.get('/api/projects/:id', (req, res) => {
  const projectId = req.params.id;
  
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  const formattedProject = {
    ...project,
    image: `${req.protocol}://${req.get('host')}${project.image}`
  };

  res.status(200).json(formattedProject);
});


app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });
  if (!email) return res.status(400).json({ error: "Email is required" });
  if (!message) return res.status(400).json({ error: "Message is required" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const newSubmission = {
    id: Date.now().toString(),
    name,
    email,
    message,
    date: new Date().toISOString()
  };
  
  contactSubmissions.push(newSubmission);

  res.status(201).json({ 
    success: true,
    message: "Contact form submitted successfully!",
    data: newSubmission 
  });
});

app.get('/api/contact', (req, res) => {
  res.status(200).json(contactSubmissions);
});

app.get('/api/crash-test', (req, res) => {
  throw new Error("This is a deliberate test error!");
});

// Catch-all 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global Error-Handling Middleware
// Express recognizes this as an error handler because it has exactly 4 arguments (err, req, res, next)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message); 
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});