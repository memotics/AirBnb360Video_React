import { Html } from "@react-three/drei"; //Camera Controls
import React, { useState } from "react";
import VideoScreen from'./VideoScreen';


const VideoClickableButton = (src)=>
{
    const [opened, setOpened] = useState(false);
    return (
        <>
            <mesh position={[-10,0,-5] }>
                {!opened && (<Html>
                    <div onClick={function(){
                        console.log("clicked");
                        setOpened(true);
                    }} style={{zIndex: 2}}>
                        <h1 className='worldSpaceClickableButton'>Palace</h1>
                    </div> 
                </Html>)}
                {opened && (<Html position={[6.5,4,-1]}>
                    <div 
                        className='worldSpaceClickableButton'
                        style={{fontSize: "30px"}}
                        onClick={function(){
                            setOpened(false);}}>X</div>
                </Html>)}
                <meshBasicMaterial></meshBasicMaterial>
                {opened && (<Html position={[-1,3,10]}>
                    <div style={{backgroundColor: "white", padding: '20px', width: "560px", height: '315px', borderRadius: '20px'}}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/jvHQO6-WOJg?si=a9XZm9RdtefTGyd5&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay=1; modestbranding; rel=0; clipboard-write; encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
                    </div>
                </Html>)}
            </mesh> 
        </>
    );
}

export default VideoClickableButton;