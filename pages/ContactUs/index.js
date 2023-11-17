import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  FormLabel,
  Divider,
  Textarea,
  Chip,
} from "@mui/joy";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
    console.log("Form submitted:", formData);
    // Add your logic for form submission
  };

  const pageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div style={pageContainerStyle}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "40vw" }}>
          <Typography level="h2" color="primary" textAlign="center" mb="20px">
            Contact Us
          </Typography>
          <Box
            boxShadow={2}
            p={3}
            mb={3}
            bgcolor="background.paper"
            borderRadius="borderRadius"
          >
            <form onSubmit={handleSubmit}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: "16px" }}
                required
              />
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: "16px" }}
                required
              />
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Message"
                minRows={3}
                maxRows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                sx={{ mb: "20px" }}
                required
              />
              <Button type="submit" sx={{ width: "100%" }}>
                Submit
              </Button>
            </form>
          </Box>
        </Box>

        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="body1">
            For inquiries, please contact us at{" "}
            <a href="mailto:your-email@example.com">your-email@example.com</a>.
          </Typography>
          <Typography variant="body1" mb="10px">
            Visit our website for more details:{" "}
            <a href="https://www.example.com">www.example.com</a>.
          </Typography>
          <Divider>
            <Chip>Discover the benefits of our services!</Chip>
          </Divider>
          <Typography>Community Chat</Typography>
          <Typography>Motivational Videos</Typography>
          <Typography>Plans</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default ContactForm;
