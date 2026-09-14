export default function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '40px' }}>About Me</h1>
      
      <div style={{ fontSize: '1.15rem', lineHeight: '1.9' }}>
        <p>
          Hi, I'm <strong>Mohammad Afrid Basha</strong>. I am a Computer Science and Engineering student at the 
          National Institute of Technology, Warangal. Having recently completed my second year, my academic 
          and project focus lies heavily in complex technical domains including machine learning, deep learning, 
          data science, cybersecurity, and compiler design.
        </p>

        <p style={{ marginTop: '20px' }}>
          Outside of building full-stack applications and data pipelines, I actively hone my algorithmic 
          problem-solving skills through competitive programming on platforms like LeetCode and Codeforces.
        </p>

        <h3 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '1.8rem' }}>Core Competencies</h3>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <li><strong>Machine Learning & Data Science:</strong> Developing CNNs, data extraction pipelines, and intelligent search engines.</li>
          <li><strong>Backend Engineering:</strong> Architecting secure APIs, managing PostgreSQL databases, and implementing ETL pipelines.</li>
          <li><strong>Frontend Development:</strong> Building responsive, state-driven interfaces using React and modern CSS.</li>
        </ul>
      </div>
    </div>
  );
}