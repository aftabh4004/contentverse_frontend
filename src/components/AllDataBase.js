import { React, useEffect, useState } from 'react';
import ContentListItem from './ContentListItem';

export default function AllDataBase({utype}) {
    const [audio, setAudio] = useState([]);
    const [video, setVideo] = useState([]);
    const [images, setImages] = useState([]);
    const [others, setOthers] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:8080/alldb')
        .then((response) => response.json())
        .then((data) => {
            setImages(data.images)
            setAudio(data.audio)
            setVideo(data.video)
            setOthers(data.others)
        })
    }, [])
    return(
        <div>
            <h2>Your Database</h2>
            
        
            <h3>Images</h3>
            {images.map((fname, i) => <ContentListItem name={fname} type="images" key={i} utype={utype}/>   )}   
        
            <h3>Audio</h3>
            {audio.map((fname, i) => <ContentListItem name={fname} type="audio" key={i} utype={utype}/>  )}   

    

            <h3>Video</h3>
            {video.map((fname, i) => <ContentListItem name={fname} type="video" key={i} utype={utype}/> )}   

        

            <h3>Others</h3>
            {others.map((fname, i) => <ContentListItem name={fname} type="others" key={i} utype={utype}/>  )}   
            
        </div>

    );
}
