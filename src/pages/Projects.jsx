import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to connect to the backend server.');
        }
        return response.json(); // Parse the JSON from the backend
      })
      .then((data) => {
        setProjects(data); // Save the data to state
        setIsLoading(false); // Turn off the loading state
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message); // Save the error to display to the user
        setIsLoading(false);
      });
  }, []); // The empty array ensures this only runs once when the page loads

  // Handle the Loading State
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h2>Loading projects from server...</h2>
      </div>
    );
  }

  // Handle the Error State
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '10vh', color: '#ff6b6b' }}>
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
        <p>Please make sure the backend server is running on port 5000.</p>
      </div>
    );
  }

  // Render the actual projects if everything went well
  return (
    <div>
      <h1>My Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}