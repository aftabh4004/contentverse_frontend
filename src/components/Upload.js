import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/upload.css'


export default function Upload() {

    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate()
    const Uploadhandler = event => {
        const file = event.target.files[0]
        const formdata = new FormData();
        formdata.append(
            file.name,
            file,
            file.name
        )


        fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formdata,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.status === true)
                setMessage("File Uploaded Successfully Location : " + data.data.des)
            else if(data.status === 500)
                setError("Something went wrong")

        }).catch((err) => {
            console.log(err);
        })
    }

    const goToDash = () =>{
        navigate('/dashboard/admin');
    }
  return(
    <div className="upload-wrapper">
        <form className='upload-form'>
          {error !== "" && <span className='error-msg'>{error}</span>}
          {message !== "" && <span className='suc-msg'>{message}</span>}

          <div className="form-root">
              <div className="form-feild">
                  <input type="file" name='file' id="file" onChange={Uploadhandler} className="input-file"/>
              </div>
              <button onClick={goToDash} className="button-3">Go to dashboard</button>
          </div>
        </form>
    </div>
  );
}
