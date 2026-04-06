// Import React and useState hook
import React, { useState } from "react";

// Functional component for controlled form
function ControlledForm() {

  // State to store form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Function to handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update only the changed field
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Show submitted data in alert box
    alert(
      `Submitted Successfully!\n\nName: ${formData.name}\nEmail: ${formData.email}`
    );

    // Clear form after submit
    setFormData({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Form heading */}
        <h2 style={styles.heading}>Registration Form</h2>

        {/* Form starts */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Name input field */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Email input field */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Password input field */}
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Submit button */}
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Inline styling object
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #74ebd5, #ACB6E5)"
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    width: "350px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px"
  },
  button: {
    padding: "12px",
    backgroundColor: "#6C63FF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

// Export component
export default ControlledForm;
