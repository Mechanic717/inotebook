import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        props.showAlert("Logged in Successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      console.error("Error:", error);
      props.showAlert("An error occurred. Please try again.", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div 
      className='container d-flex justify-content-center align-items-center' 
      style={{ minHeight: '100vh' }}
    >
      <div 
        style={{ 
          width: '40%', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
          padding: '20px', 
          borderRadius: '5px', 
          backgroundColor: 'white' 
        }}
      >
        <h2>Login to Continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={credentials.email}
              onChange={onChange}
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
