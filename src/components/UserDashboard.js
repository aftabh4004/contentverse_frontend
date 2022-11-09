import React, { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import './../css/dashboard.css'
import ContentListItem from './ContentListItem';


export default function UserDashboard() {
    const {user} = useParams()
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const [available, setAvailable] = useState([])
    const [pending, setPending] = useState([])

    const Logout = () => {
        console.log("Logout");
        navigate('/');    
    }

    useEffect(() =>{
        fetch('http://localhost:8080/userdata', {
        method: 'POST',
        body: JSON.stringify({
            username: user
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setName(data.data.name)



            data.images.map(image => {
                if (image.timestamp > Date.now()){
                    setPending(cur => {
                        for (const c of cur){
                            if (c.file === image.file)
                                return cur
                        }
                        return [...cur, image]
                    })
                } 
                else{
                    setAvailable( cur => {
                        for (const c of cur){
                            if (c.file === image.file)
                                return cur
                        }
                        return [...cur, image]
                    })
                }
                return 0
            })

            data.audio.map(au => {
                if (au.timestamp > Date.now()){
                    setPending(cur => {
                        for (const c of cur){
                            if (c.file === au.file)
                                return cur
                        }
                        return [...cur, au]
                    })
                } 
                else{
                    setAvailable( cur => {
                        for (const c of cur){
                            if (c.file === au.file)
                                return cur
                        }
                        return [...cur, au]
                    })
                }
                return 0
            })

            data.video.map(v => {
                if (v.timestamp > Date.now()){
                    setPending(cur => {
                        for (const c of cur){
                            if (c.file === v.file)
                                return cur
                        }
                        return [...cur, v]
                    })
                } 
                else{
                    setAvailable( cur => {
                        for (const c of cur){
                            if (c.file === v.file)
                                return cur
                        }
                        return [...cur, v]
                    })
                }
                return 0
            })

            data.others.map(other => {
                if (other.timestamp > Date.now()){
                    setPending(cur => {
                        for (const c of cur){
                            if (c.file === other.file)
                                return cur
                        }
                        return [...cur, other]
                    })
                } 
                else{
                    setAvailable( cur => {
                        for (const c of cur){
                            if (c.file === other.file)
                                return cur
                        }
                        return [...cur, other]
                    })
                }
                return 0
            })


           
            
        })
    })
  
    return(
            <div>
                <span className='top-span'>
                    <div className='dashboard-text'>
                        Welcome {name}
                    </div>
                    
                    <div onClick={Logout} className="logout-bt">Logout</div>
                </span>
                <h2>User Dashboard </h2>
                <div className='user-wrapper'>
                    <div className='available'>
                        <h3>You can download</h3>
                        {available.map((fdata, i) => <ContentListItem name={fdata.file} type={fdata.ftype} key={i} utype="user" /> )}
                        
                    </div>
                    <div className='pending'>
                        <h3>Available Soon</h3>
                        {pending.map((fdata, i) => <ContentListItem name={fdata.file} type={fdata.ftype} key={i} utype="user" timestamp={fdata.timestamp}/> )}
                    </div>
                </div>
            </div>
        
  );
}
