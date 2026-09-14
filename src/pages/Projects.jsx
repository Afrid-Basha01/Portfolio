import { projectsData } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  return (
    <div>
      <h1>My Projects</h1>
      <div className="projects-grid">
        {/* Map over the array and pass each object as a prop */}
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}