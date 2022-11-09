import React, { useState } from 'react';
import './../css/login.css'

export default function Login({setusr, setname, settype}) {
  const [name, setName] = useState()
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const submitHandler =  e => {
      e.preventDefault();
      fetch('http://localhost:8080/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
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
              setError("")
              setSuccess("Successfully Registered, Please login")
          }
          else if(data.status === 500){
            setSuccess("")
            setError("Something went wrong!")
          }
          else if(data.status === 300){
            setSuccess("")
            setError("Username alreay exists!")
          }

      })
  }
  
  return(
    <div id="login-form-wrap">
      <h2 className = "h2Class">SignUp</h2>
        <form onSubmit={submitHandler}>
          {error !== "" && <span className='error-msg'>{error}</span>}
          {success !== "" && <span className='suc-msg'>{success}</span>}

          <div>
              <div id="login-form">
                <p className="pClass">
                  <label htmlFor='name'></label>
                  <input type="text" placeholder="Full Name" name="name" className="inputClass" required onChange={e => setName(e.target.value)}/>
                </p>
              </div>
              <div id="login-form">
                <p className="pClass">
                  <label htmlFor='username'></label>
                  <input type="text" placeholder="Username" name="username" className="inputClass" required onChange={e => setUser(e.target.value)}/>
                </p>
              </div>
              <div id="login-form">
                <p className="pClass">
                  <label htmlFor='password'></label>
                  <input type="password" placeholder="Create Password" name='password' className="inputClass" required onChange={e => setPassword(e.target.value)}/>
                </p>
              </div>
              <div id="login-form">
                <p className="pClass">
                <input type="submit" value="SignUp " className="inputClass"/>
                </p>
              </div>
              <div id="create-account-wrap">
                <p className="pClass">
                  Already have an account?? 
                  <a href="/">Login here</a>
                </p>
              </div>
          </div>
        </form>
    </div>
  );
}
