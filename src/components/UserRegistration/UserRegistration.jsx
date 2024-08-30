import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserRegistration.css'
const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user already exists
    const userExists = existingUsers.some(user => user.username === username);

    if (userExists) {
      alert('User already exists');
      return;
    }
    const newUser = { username, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('User registered successfully!');
    navigate('/login')
  }

  return (
    <div className="container-fluid login-container d-flex justify-content-center align-items-center">
        <div className="form-container ">
            <form action="" className='registration-form'>

            <div className="row mb-4">
                <div className="col-sm-12 d-flex justify-content-center">
                    
                    <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-sm-12 d-flex justify-content-center">

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <button className="reg_btn" onClick={handleRegister}>Register</button>
                </div>
                <div className="col-sm-12">
                    <button className="back_btn mt-3" onClick={() => navigate('/login')}>Back to Login</button>
                </div>
            </div>
                
                
            </form>
        </div>
      
    </div>
  );
};

export default Registration;
