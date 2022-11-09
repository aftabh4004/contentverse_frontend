import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Distribute() {
    const {fname, ftype} = useParams();
    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    

    const DistributeHandler = (e) => {
        e.preventDefault()
        console.log(e.target[0])
        let child_count = e.target.childElementCount - 1;
        let data  = {
            timestamp: "",
            users: [],
            fname: fname,
            ftype: ftype
        }
        let date =  new Date()
        

        let schedule = e.target[0].value.split(':');
        if (schedule[0] === ""){
            date = Date.now()
            data.timestamp = Date.now();
        }
        else{
            date.setHours(Number(schedule[0]), Number(schedule[1]))
            data.timestamp = date.getTime()
        }
    
        // Broadcast
        if (e.target[1].checked){
            data.users = users.map(user => user.username);
        }
        else{
            for (let i = 2; i < child_count; i++){
                if(e.target[i].checked)
                    data.users.push(e.target[i].value)
            }
        }
        
        console.log(data)


        fetch('http://localhost:8080/distribute', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            navigate('/dashboard/aftabh4004');
        })

    }

    useEffect(() =>{
        fetch('http://localhost:8080/alluser')
        .then((response) => response.json())
        .then((data) => {
            let users = data.data;
            setUsers(users);
        })   
    }, [])

  return(
    <div>
        <h2>Distribute {fname} {ftype}</h2>
        <form onSubmit={DistributeHandler}>
            <div>
                <label htmlFor="time">Schedule for (24hr format)</label>
                <input type="time" id="time"/>
                <br/>
            </div>
            <div >
                <input type="checkbox" value="broadcast" id="broadcast"/>
                <label htmlFor="broadcast">Broadcast</label>
                <br/>
            </div>
            {users.map((item, i) => {
                return (
                    <div key={i}>
                        <input type="checkbox" value={item.username} key={item.username} id={item.username} name="usercb"/>
                        <label htmlFor={item.username} key={item.name}>{item.name}</label>
                        <br key={i}/>
                    </div>
                )
            })}
            <input type="submit" value="Distribute"/>
            
        </form>
    </div>
  );
}
