# Full Stack Portfolio Website

**Author:** Mohammad Afrid Basha 
**Course:** CS1303 - Full Stack Development (Assignment 3)

## Overview
This project extends a static React portfolio into a full-stack application by integrating a custom Node.js and Express backend. It features dynamic data fetching for project portfolios (including projects like Control Plane AI and SecureVault) and a fully functional contact form submission system. 

## Project Structure
*   `/src`: Contains the React Vite frontend (from Assignment 2).
*   `/server`: Contains the Express.js backend, built for this assignment.

## Setup & Run Instructions

This application requires two terminal windows to run both the frontend and backend concurrently.

**1. Install Dependencies**
In the root directory (Frontend):
\`\`\`bash
npm install
\`\`\`
In the `/server` directory (Backend):
\`\`\`bash
cd server
npm install
\`\`\`

**2. Environment Configuration**
Inside the `/server` folder, copy the example environment file to create your local config:
\`\`\`bash
cp .env.example .env
\`\`\`
Ensure your `.env` file contains the port: `PORT=5000`.

**3. Start the Application**
**Terminal 1 (Start the Backend):**
\`\`\`bash
cd server
npm run dev
\`\`\`
**Terminal 2 (Start the Frontend):**
\`\`\`bash
# From the root of the project
npm run dev
\`\`\`
The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Architectural Decisions & Assignment Notes
*   **Storage:** Per the assignment guidelines, this application uses an **in-memory array** to store contact form submissions. Submissions will clear if the server is restarted.
*   **Security Exception Notice:** As explicitly requested in Task B5 of the assignment instructions, the `GET /api/contact` endpoint is completely open and requires no authentication. This is exclusively for grader evaluation and is not meant for production environments.

---

## API Endpoints Reference

### 1. Health Check
*   **URL:** `GET /`
*   **Description:** Confirms the Express server is running.
*   **Success Response (200):** 
    \`\`\`json
    { "status": "ok" }
    \`\`\`

### 2. Get All Projects
*   **URL:** `GET /api/projects`
*   **Description:** Returns a list of all portfolio projects.
*   **Success Response (200):**
    \`\`\`json
    [
      {
        "id": "1",
        "title": "Animalzpedia Species CNN & Chatbot",
        "description": "A machine learning pipeline...",
        "techStack": ["Python", "TensorFlow", "Flask", "SPARQL", "LLMs"],
        "image": "http://localhost:5000/images/animalzpedia.jpg",
        "link": "https://github.com"
      }
    ]
    \`\`\`

### 3. Get Single Project
*   **URL:** `GET /api/projects/:id`
*   **Description:** Returns a specific project by its ID.
*   **Success Response (200):** (Returns the single JSON object matching the ID).
*   **Error Response (404):** 
    \`\`\`json
    { "error": "Project not found" }
    \`\`\`

### 4. Submit Contact Form
*   **URL:** `POST /api/contact`
*   **Description:** Accepts and validates a new contact form submission.
*   **Request Body:**
    \`\`\`json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello!"
    }
    \`\`\`
*   **Success Response (201):**
    \`\`\`json
    {
      "success": true,
      "message": "Contact form submitted successfully!",
      "data": { "id": "123456789", "name": "John Doe", ... }
    }
    \`\`\`
*   **Error Response (400 - Validation Failed):**
    \`\`\`json
    { "error": "Invalid email format" }
    \`\`\`

### 5. View Submissions (Grader Endpoint)
*   **URL:** `GET /api/contact`
*   **Description:** Returns an array of all validated submissions currently in memory.

### 6. Test Global Error Handler
*   **URL:** `GET /api/crash-test`
*   **Description:** Intentionally throws an error to demonstrate global middleware handling without crashing the server.
*   **Response (500):**
    \`\`\`json
    { "error": "Internal Server Error" }
    \`\`\`