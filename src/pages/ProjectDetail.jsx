import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="detail-container" style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h2>Project not found!</h2>
        <Link to="/projects"><button>Back to Projects</button></Link>
      </div>
    );
  }

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