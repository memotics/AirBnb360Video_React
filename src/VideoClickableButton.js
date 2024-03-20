import { Html } from "@react-three/drei"; //Camera Controls
import React, { useState } from "react";
import VideoScreen from'./VideoScreen';

const VideoClickableButton = (src)=>
{
    const ytVideoElement = document.getElementById("ytVideo");
    const ytVideoHolder = document.getElementById("videoHolder");
    const ytCloseButton = document.getElementById("VideoClose");
    const [opened, setOpened] = useState(false);
    return (
        <>
            <mesh position={[-10,0,-5] }>
                {!opened && (<Html>
                    <div onClick={function(){
                        console.log(ytVideoHolder);
                        setOpened(true);
                        ytVideoHolder.style.visibility = "visible";
                        ytVideoHolder.style.pointerEvents = "all";
                        ytVideoElement.src = "https://www.youtube.com/embed/jvHQO6-WOJg?si=a9XZm9RdtefTGyd5&amp;";
                        ytCloseButton.addEventListener('click', ()=>{
                            ytVideoHolder.style.visibility = "hidden";
                            ytVideoHolder.style.pointerEvents = "none";
                            ytVideoElement.src = "";
                            setOpened(false);
                            ytCloseButton.removeEventListener('click', this);
                        });
                    }} style={{zIndex: 2}}>
                        <h1 className='worldSpaceClickableButton'>Palace</h1>
                    </div> 
                </Html>)}
                <meshBasicMaterial></meshBasicMaterial>
            </mesh> 
        </>
    );
}

export default VideoClickableButton;