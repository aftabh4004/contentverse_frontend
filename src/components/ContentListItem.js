import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/list.css'

export default function ContentListItem({name, type, utype, timestamp}) {
  let time = new Date(timestamp).toTimeString();
  const navigate = useNavigate();
  const HandleDistribute = () => {
    navigate('/distribute/' + name + '/' + type);
  }

  return(
    <div className='file-wrapper'>
      <div className='filename'>
        {name}
      </div>
      <div className='file-btn'>
          {utype === "user" ?
            timestamp !== undefined ?
            <div><span className='ab-sp'>Available by {time}</span></div>:
            (
            <div>
              <form action='http://localhost:8080/download' method='GET'>
              <input type="hidden" name="fname" value={name} readOnly/>
              <input type="hidden" name="ftype" value={type} readOnly/>
              <button className='button-3' type='download'>Download</button>
            </form>
            </div>
            ):

        (
          <>
          <div>

          <form action='http://localhost:8080/download' method='GET'>
            <input type="hidden" name="fname" value={name} readOnly/>
            <input type="hidden" name="ftype" value={type} readOnly/>
            <button className='button-3' type='download'>Download</button>
          </form>
          </div>
          <div>

          <form>
          <button className='button-3' onClick={HandleDistribute}>Distribute</button>    
          </form>
          </div>
          </>
        )
        }
      </div>
    
    
    </div>
  );
}
