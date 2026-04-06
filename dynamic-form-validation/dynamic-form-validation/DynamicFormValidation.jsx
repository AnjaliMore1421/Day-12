// Import React and useState hook
import React, { useState } from "react";

// Functional component for dynamic form validation
function DynamicFormValidation() {

  // Initial state for all form fields
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  // State to store form input values
  const [formData, setFormData] = useState(initialState);

  // State to store validation errors
  const [errors, setErrors] = useState({});

  // State to show success message
  const [success, setSuccess] = useState("");

  // Function to validate each field dynamically
  const validateField = (name, value) => {
    let error = "";

    switch (name) {

      // Validate name field
      case "name":
        if (!value.trim()) error = "Name is required";
        break;

      // Validate email field
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format";
        }
        break;

      // Validate password field
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      // Validate confirm password field
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Validate current field while typing
    const errorMessage = validateField(name, value);

    // Update errors state
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage
    }));

    // Clear success message when user edits again
    setSuccess("");
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    let newErrors = {};

    // Validate all fields before submit
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // Set all errors
    setErrors(newErrors);

    // If no errors, show success message
    if (Object.keys(newErrors).length === 0) {
      setSuccess("Form submitted successfully ✅");

      // Reset form fields
      setFormData(initialState);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Form heading */}
        <h2 style={styles.heading}>Dynamic Form Validation</h2>

        {/* Form starts */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Name input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.name}</p>
          </div>

          {/* Email input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.email}</p>
          </div>

          {/* Password input */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.password}</p>
          </div>

          {/* Confirm password input */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.confirmPassword}</p>
          </div>

          {/* Submit button */}
          <button type="submit" style={styles.button}>
            Register
          </button>

          {/* Success message */}
          {success && <p style={styles.success}>{success}</p>}
        </form>
      </div>
    </div>
  );
}

// Inline styling object
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)"
  },
  card: {
    width: "420px",
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px"
  },
  button: {
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "5px"
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: "10px"
  }
};

// Export component
export default DynamicFormValidation;
