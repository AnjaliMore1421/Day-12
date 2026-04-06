// Import React and useState hook
import React, { useState } from "react";

// Functional component for multi-field form
function MultiFieldForm() {

  // Initial state object for all form fields
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    message: ""
  };

  // State to store form data
  const [formData, setFormData] = useState(initialState);

  // State to show success message after submit
  const [submitted, setSubmitted] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update only the changed field using spread operator
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Hide success message while editing again
    setSubmitted(false);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setSubmitted(true); // Show success message

    // Clear form after 1 second
    setTimeout(() => {
      setFormData(initialState);
    }, 1000);
  };

  // Function to clear form manually
  const handleClear = () => {
    setFormData(initialState);
    setSubmitted(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Form heading */}
        <h2 style={styles.heading}>User Registration Form</h2>

        {/* Form starts */}
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Full name input */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Phone number input */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* City input */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Gender dropdown */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>

          {/* Message textarea */}
          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
          />

          {/* Buttons container */}
          <div style={styles.buttonContainer}>
            
            {/* Submit button */}
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>

            {/* Clear button */}
            <button
              type="button"
              onClick={handleClear}
              style={styles.clearButton}
            >
              Clear
            </button>
          </div>
        </form>

        {/* Success message after submit */}
        {submitted && (
          <p style={styles.success}>Form submitted successfully ✅</p>
        )}

        {/* Live preview section */}
        <div style={styles.preview}>
          <h3>Live Preview</h3>
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Message:</strong> {formData.message}</p>
        </div>
      </div>
    </div>
  );
}

// Styling object for inline CSS
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px"
  },
  card: {
    width: "450px",
    background: "#fff",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px"
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "80px",
    resize: "none"
  },
  buttonContainer: {
    display: "flex",
    gap: "10px"
  },
  submitButton: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px"
  },
  clearButton: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px"
  },
  success: {
    marginTop: "15px",
    color: "green",
    textAlign: "center"
  },
  preview: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    background: "#f9fafb"
  }
};

// Export component
export default MultiFieldForm;
