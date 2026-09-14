import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({
    name: 'Name is required',
    email: 'Email is required',
    message: 'Message is required'
  });
  
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state during submit
  const [serverMessage, setServerMessage] = useState(null); // To display success or error from the backend

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear any previous server messages when the user starts typing again
    if (serverMessage) setServerMessage(null);
  };

  // Client-side validation
  useEffect(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    setIsSubmitDisabled(Object.keys(newErrors).length > 0);
  }, [formData]);

  // The updated submit handler to talk to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerMessage(null);

    // Using fetch to send a POST request
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Converts our React state into a JSON string
    })
      .then((response) => {
        return response.json().then((data) => ({ status: response.status, body: data }));
      })
      .then(({ status, body }) => {
        if (status === 201) {
          // Success! Show confirmation and reset the form
          setServerMessage({ type: 'success', text: body.message });
          setFormData({ name: '', email: '', message: '' });
        } else {
          // Server rejected it (e.g., 400 Bad Request)
          setServerMessage({ type: 'error', text: body.error || 'Failed to send message.' });
        }
      })
      .catch((err) => {
        // Network error (server is down)
        console.error(err);
        setServerMessage({ type: 'error', text: 'Network error. Make sure the server is running.' });
      })
      .finally(() => {
        setIsSubmitting(false); // Turn off loading state regardless of outcome
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', padding: '20px 0' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '30px' }}>Contact Me</h1>
      
      {/* Display our server success/error message */}
      {serverMessage && (
        <div style={{ 
          padding: '15px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          backgroundColor: serverMessage.type === 'success' ? '#d4edda' : '#f8d7da',
          color: serverMessage.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${serverMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {serverMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontWeight: '600' }}>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            disabled={isSubmitting}
          />
          {errors.name && <span style={{ color: '#ff6b6b', fontSize: '13px', display: 'block', marginTop: '5px' }}>{errors.name}</span>}
        </div>

        <div>
          <label style={{ fontWeight: '600' }}>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            disabled={isSubmitting}
          />
          {errors.email && <span style={{ color: '#ff6b6b', fontSize: '13px', display: 'block', marginTop: '5px' }}>{errors.email}</span>}
        </div>

        <div>
          <label style={{ fontWeight: '600' }}>Message:</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            rows="6"
            disabled={isSubmitting}
          />
          {errors.message && <span style={{ color: '#ff6b6b', fontSize: '13px', display: 'block', marginTop: '5px' }}>{errors.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitDisabled || isSubmitting} 
          style={{ padding: '15px', marginTop: '10px', fontSize: '1.1rem', opacity: (isSubmitDisabled || isSubmitting) ? 0.6 : 1 }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}