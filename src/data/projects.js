import secureVaultImg from '../assets/securevault.jpg';
import dataWarehouseImg from '../assets/datawarehouse.jpg';
import animalzpediaImg from '../assets/animalzpedia.jpg';

export const projectsData = [
  {
    id: "1",
    title: "Animalzpedia Species CNN & Chatbot",
    description: "A machine learning pipeline that identifies animal species from photos and includes a secure, context-aware veterinary RAG chatbot.",
    techStack: ["Python", "TensorFlow", "Flask", "SPARQL", "LLMs"],
    image: animalzpediaImg,
    link: "https://github.com"
  },
  {
    id: "2",
    title: "Enterprise Data Warehouse",
    description: "An end-to-end PostgreSQL ETL pipeline that processes raw CRM data into a standardized Medallion Architecture for business reporting.",
    techStack: ["PostgreSQL", "SQL", "ETL Pipelines", "Draw.io"],
    image: dataWarehouseImg,
    link: "https://github.com"
  },
  {
    id: "3",
    title: "SecureVault: Zero Knowledge KYC",
    description: "A cloud storage prototype featuring client-side encryption and automated PIN breach-checking to ensure complete data privacy.",
    techStack: ["Python", "Flask", "Web Crypto API", "Supabase"],
    image: secureVaultImg,
    link: "https://github.com"
  }
];