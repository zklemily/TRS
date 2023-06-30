import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    isActive: true,
    userType: { type: 'FullTimeStudent' },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const { firstName, lastName, username, email, password, isActive, userType, createdAt, updatedAt } = user;

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      username,
      email,
      password,
      isActive,
      userType,
      createdAt,
      updatedAt,
    };

    try {
      const response = await axios.post('http://localhost:8080/users', user);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
}
