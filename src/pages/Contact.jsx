import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({
    name: 'Name is required',
    email: 'Email is required',
    message: 'Message is required'
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    setIsSubmitDisabled(Object.keys(newErrors).length > 0);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    // Added margin: '0 auto' here to center the form on the page
    <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', padding: '20px 0' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '30px' }}>Contact Me</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontWeight: '600' }}>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
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
          />
          {errors.message && <span style={{ color: '#ff6b6b', fontSize: '13px', display: 'block', marginTop: '5px' }}>{errors.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitDisabled} 
          style={{ padding: '15px', marginTop: '10px', fontSize: '1.1rem' }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}