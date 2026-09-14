import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProjectDetail() {
  const { projectId } = useParams(); 
  
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific project when the page loads
  useEffect(() => {
    // Notice how we add the projectId to the end of the URL
    fetch(`http://localhost:5000/api/projects/${projectId}`)
      .then((response) => {
        if (!response.ok) {
          // If the server sends our 404 error, we handle it specifically
          if (response.status === 404) {
            throw new Error("Project not found!");
          }
          throw new Error("Failed to connect to the backend server.");
        }
        return response.json();
      })
      .then((data) => {
        setProject(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [projectId]); // We put projectId here so if the URL changes, it re-fetches

  // Loading state
  if (isLoading) {
    return (
      <div className="detail-container" style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h2>Loading project details...</h2>
      </div>
    );
  }

  // Handle "Not Found" or Server Errors
  if (error) {
    return (
      <div className="detail-container" style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h2>{error}</h2>
        <Link to="/projects"><button>Back to Projects</button></Link>
      </div>
    );
  }

  // Render the actual project details
  return (
    <div className="detail-container">
      <Link to="/projects" className="back-link">&larr; Back to Projects</Link>
      
      <h1 className="detail-title">{project.title}</h1>
      
      <div className="detail-card">
        <img 
          src={project.image} 
          alt={project.title} 
          className="detail-image"
        />
        
        <div className="tech-stack" style={{ marginBottom: '20px' }}>
          {project.techStack.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>

        <p className="detail-description">{project.description}</p>
        
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <button>View Source Code</button>
        </a>
      </div>
    </div>
  );
}