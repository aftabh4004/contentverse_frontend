import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/login.css'

export default function Login({setusr, setname, settype}) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();
  const submitHandler =  e => {
      e.preventDefault();
      fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify({
        username: user,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          if(data.status === 200){
              setname(data.data.name)
              settype(data.data.type)
              setusr(user)
              navigate('/dashboard/' + user)
          }
          else if(data.status === 500){
            setError("Invalid username or password!")
          }
          else if(data.status === 300){
            setError("Unregistered user")
          }

      })
  }
  
  return(
    <div id="login-form-wrap">
      <h2 className= "h2Class">Login</h2>
        <form onSubmit={submitHandler}>
          {error !== "" && <span className='error-msg'>{error}</span>}
          <div>
              <div id="login-form">
                <p className="pClass">
                  <label htmlFor='username'></label>
                  <input type="text" placeholder="Username" name="username" className="inputClass" required onChange={e => setUser(e.target.value)}/>
                </p>
              </div>
              <div id="login-form">
                <p className="pClass">
                  <label htmlFor='password'></label>
                  <input type="password" placeholder="Password" name='password' className="inputClass" required onChange={e => setPassword(e.target.value)}/>
                </p>
              </div>
              <div id="login-form">
                <p className="pClass">
                <input type="submit" value="Login " className="inputClass"/>
                </p>
              </div>
              <div id="create-account-wrap">
                <p className="pClass">
                  Not a member? 
                  <a href="/signup">Create Account</a>
                </p>
              </div>
          </div>
        </form>
    </div>
  );
}
