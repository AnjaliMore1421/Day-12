import React, { useState } from "react";

function MultiFieldForm() {
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    message: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setFormData(initialState);
    }, 1000);
  };

  const handleClear = () => {
    setFormData(initialState);
    setSubmitted(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>User Registration Form</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
            required
          />

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

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
          />

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>

            <button
              type="button"
              onClick={handleClear}
              style={styles.clearButton}
            >
              Clear
            </button>
          </div>
        </form>

        {submitted && (
          <p style={styles.success}>Form submitted successfully ✅</p>
        )}

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

export default MultiFieldForm;
