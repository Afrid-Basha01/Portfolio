import { useState } from 'react';
import { Link } from 'react-router-dom';

// The component receives data entirely via props (no hardcoded content)
export default function ProjectCard({ project }) {
  // Local state scoped strictly to this specific card instance
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="project-card">
      <img 
        src={project.image} 
        alt={project.title} 
        style={{ width: '100%', borderRadius: '4px' }} 
      />
      <h2>{project.title}</h2>
      
      <div className="tech-stack">
        {project.techStack.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>

      {/* Conditionally render description based on local state */}
      {isExpanded && <p>{project.description}</p>}

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Hide Details' : 'View Details'}
        </button>
        
        {/* Link to the dynamic route we will build in the next step */}
        <Link to={`/projects/${project.id}`}>
          <button style={{ background: 'transparent', color: 'inherit', border: '1px solid currentColor' }}>
            Open Page
          </button>
        </Link>
      </div>
    </div>
  );
}