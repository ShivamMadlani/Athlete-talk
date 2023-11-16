import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your logic for form submission
  };

  const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  };

  const contentContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    maxWidth: 400,
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const formTitleStyle = {
    textAlign: 'center',
    marginBottom: '16px',
    color: '#2196F3', // Blue color
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const formElementStyle = {
    marginBottom: '16px',
  };

  const submitButtonStyle = {
    backgroundColor: '#2196F3', // Blue color
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#1565C0', // Darker blue on hover
    },
  };

  const detailsContainerStyle = {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const detailsTextStyle = {
    marginBottom: '10px',
  };

  const optionsListStyle = {
    listStyleType: 'disc',
    padding: 0,
    textAlign: 'center',
  };

  const footerStyle = {
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <div style={pageContainerStyle}>
      {/* Content Container */}
      <Box style={contentContainerStyle}>
        {/* Contact Us Box */}
        <Container style={containerStyle}>
          <Typography variant="h5" style={formTitleStyle}>
            Contact Us
          </Typography>
          {/* Form elements for the recipient inside a box */}
          <Box
            boxShadow={2}
            p={3}
            mb={3}
            bgcolor="background.paper"
            borderRadius="borderRadius"
          >
            <form style={formStyle} onSubmit={handleSubmit}>
              <TextField
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={formElementStyle}
                required
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={formElementStyle}
                required
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={formElementStyle}
                required
              />
              <Button
                type="submit"
                variant="contained"
                style={submitButtonStyle}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Container>

        {/* Details of the website */}
        <Box style={detailsContainerStyle}>
          <Typography variant="body1" style={detailsTextStyle}>
            For inquiries, please contact us at{' '}
            <a href="mailto:your-email@example.com">your-email@example.com</a>.
          </Typography>
          <Typography variant="body1" style={detailsTextStyle}>
            Visit our website for more details:{' '}
            <a href="https://www.example.com">www.example.com</a>.
          </Typography>
          <Typography variant="body1">
            Discover the benefits of our services!
          </Typography>
          <Typography variant="body2">Community Chat</Typography>
          <Typography variant="body2">Motivational Videos</Typography>
          <Typography variant="body2">Plans</Typography>
          {/* <ul style={optionsListStyle}>
            <li>Community Chat</li>
            <li>Plans</li>
            <li>Motivational Videos</li>
          </ul> */}
        </Box>
      </Box>

      {/* Footer
      <div style={footerStyle}>
        <Typography variant="body2">Options:</Typography>
        <ul style={optionsListStyle}>
          <li>Community Chat</li>
          <li>Plans</li>
          <li>Motivational Videos</li>
        </ul>
      </div> */}
    </div>
  );
};

export default ContactForm;
