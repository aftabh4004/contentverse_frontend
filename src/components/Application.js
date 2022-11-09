import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';
import Header from './Header';
import Upload from './Upload';
// import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import AllDataBase from './AllDataBase';
import Distribute from './Distribute';
import './../css/root.css'



function App() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Login setusr={setUser} setname={setName} settype={setType}/>} />
          <Route path="/signup" element={<SignUp setusr={setUser} setname={setName} settype={setType}/>} />
          {
            type === "admin"?
            <Route path="/dashboard/:admin" element={<AdminDashboard user={user} name={name} type={type}/>} />  :
            <Route path="/dashboard/:user" element={<UserDashboard user={user} name={name} type={type}/>} /> 
          }
          <Route path="/dashboard/admin" element={<AdminDashboard user={user} name={name} type={type}/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/alldb" element={<AllDataBase utype={type}/>} />
          <Route path="/distribute/:fname/:ftype" element={<Distribute />} />



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
