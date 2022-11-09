import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/dashboard.css'


export default function AdminDashboard() {
    const navigate = useNavigate();

    const Logout = () => {
        console.log("Logout");
        navigate('/');    
    }

    const Uploadhandler = () => {
        navigate('/upload');
    }

    const DBHandler = () => {
        navigate('/alldb');
    }

  
    return(
            <div>
                <span className='top-span'>
                    <div className='dashboard-text'>
                        Welcome Aftab Hussain (admin)
                    </div>
                    
                    <div onClick={Logout} className="logout-bt">Logout</div>
                </span>
                <h2>Dashboard </h2>
                <div className='div-bt-wrapper'>
                    <div className='div-db' onClick={DBHandler}><span className='div-text'>Your DataBase</span></div>
                    <div className='div-up' onClick={Uploadhandler}><span className='div-text'>Upload files</span></div>    
                </div>       
            </div>
        
  );
}
