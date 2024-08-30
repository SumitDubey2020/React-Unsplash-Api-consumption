import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'

export default function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to dashboard if already authenticated
    }
  }, [navigate]);


  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find user by username and password
    const user = existingUsers.find(user => user.username === username && user.password === password);

    if (user) {
      alert('Login successful!');
      localStorage.setItem('auth', JSON.stringify(true));
      navigate('/dashboard');
    } else {
      setErrorMessage('Invalid username or password');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <>
    <div className="container-fluid login-container d-flex justify-content-center align-items-center">
    <div className="form-container ">
      <form action="" className="login-form">
        <div className="row mb-4">
          <div className="col-sm-12 d-flex justify-content-center">
          <input type="text" id="#username" className='uname' name="username" required placeholder='username' 
          value={username}
        onChange={(e) => setUsername(e.target.value)}/>
          </div>
         
        </div>
        <div className='row mb-4'>
            <div className="col-sm-12 d-flex justify-content-center">
              <input type="text" id="#password" className='pswrd' name="username" required placeholder='password'  
              value={password}
        onChange={(e) => setPassword(e.target.value)}/>
            </div>
        </div>
        {errorMessage && (
              <div className="row">
                <div className="col-sm-12 text-center">
                  <p style={{ color: 'red',fontWeight:'600',fontSize:'20px' }}>{errorMessage}</p>
                </div>
              </div>
            )}
        <div className='row'>
          <div className="col-sm-12 text-center">
            <button className="form-submit" onClick={handleLogin}>Login <span></span></button>
            <button className="register_btn mt-3" onClick={() => navigate('/register')}>Register</button>
          </div>
        </div>
    
     
      </form>
    </div>
      </div>
   
    </>
  )
}


