import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.showAlert("Account Created Successfully", "success");
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
        <h2>Create an account to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name='name'
              placeholder="Enter your name"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name='email'
              placeholder="Enter email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name='password'
              placeholder="Password"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name='cpassword'
              placeholder="Confirm Password"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
