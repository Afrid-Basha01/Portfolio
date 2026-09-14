import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      {/* The assignment requires a link back to Home on the 404 page */}
      <Link to="/Home">Go back Home</Link> 
    </div>
  );
}