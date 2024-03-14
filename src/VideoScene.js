import * as THREE from 'three';
import { Html, OrbitControls } from "@react-three/drei"; //Camera Controls
import { useFrame } from '@react-three/fiber';
import React, { Suspense, useState, useRef, useEffect } from "react";

//Code in here is meant for only threejs/webgl scene.

//some control variables
var openedWindow = false;
const VideoScene = ()=>
{
    //references
    const videoSphereRef = useRef();
    const videoChangeRate = 0.5;
    // const videoPopUpNodeRange = 0.5;
    const [showCafeButton, setShowCafeButton]= useState(false);

    const descriptionHolder = document.getElementById("descriptionHolder");
    descriptionHolder.style.zIndex = "3";
    const holder = document.createElement("div");
    const header = document.createElement("h3");
    const img = document.createElement("img");
    const descriptiontext = document.createElement("p");
    const closeButton = document.createElement("button");

    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = "./videos/street360.mp4";
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.loop = false;
        return vid;
      });
    
    const [description] = useState(() => {

        descriptionHolder.style.visibility = "hidden";
        descriptionHolder.style.pointerEvents = "none";
        openedWindow = false;
        //setup the popup window
        descriptionHolder.appendChild(holder);
        closeButton.className = "UIClickableButton"
        closeButton.textContent = "X";
        closeButton.addEventListener('click', function(){
            descriptionHolder.style.visibility = "hidden";
            descriptionHolder.style.pointerEvents = "none";
            openedWindow = false;
        });
        holder.appendChild(closeButton);

        header.style.margin = "5%";
        header.textContent = "Cafe Valvet";
        header.style.textAlign = "center";
        holder.appendChild(header);
        
        img.src = "https://i.seadn.io/gae/tgI3ZKaErx1p33QEbW7Sqry5__D60WgpYjKmBIzmrWy1pEk0Urc9aIVBU9seBnLSCUM4hx-5aU4LpIOBC3_43XreHQhs0WqNKE-4fw?auto=format&dpr=1&w=1000";
        img.style.width = "90%";
        img.style.margin = "5%";
        holder.appendChild(img);

        descriptiontext.textContent = "A normal cafe selling NFTs, some say it tastes good";
        descriptiontext.style.margin = "5%";
        descriptiontext.style.textAlign = "center";
        descriptiontext.style.textOverflow = "wrap";
        descriptiontext.style.overflowWrap = "break-word";
        holder.appendChild(descriptiontext);
        return holder;
      });

    useEffect(() => {
        console.log("Binding Key presses");
        window.addEventListener('keydown', (event) => {
            if (openedWindow)
                return;
            console.log(videoChangeRate);
            if (event.key === 'ArrowUp' || event.key === 'w')
            {
                video.currentTime += videoChangeRate;
            }
            else if (event.key === 'ArrowDown' || event.key === 's')
            {
                video.currentTime -= videoChangeRate;
            }
            console.log("Current Time" + video.currentTime);
            setShowCafeButton(video.currentTime === 22);
        })
        window.addEventListener('wheel', (event)=>{
            if (openedWindow)
                return;
            console.log(videoChangeRate);
            if (event.deltaY > 0)
            {
                video.currentTime += videoChangeRate;
            }
            else if (event.deltaY < 0)
            {
                video.currentTime -= videoChangeRate;
            }
            console.log("Current Time" + video.currentTime);
            setShowCafeButton(video.currentTime === 22);
        })
    }, []);

    useFrame((state, delta)=>{ //The Update function, runs each frame
        
    });

    return (
        <>
            {/* Camera Controls */}
            <OrbitControls enableZoom={false} enablePan={false}></OrbitControls>
            {/* <axesHelper args={[1000]}></axesHelper> */}
            {/* The 360 Video */}
            <Suspense fallback={
                <>
                    <mesh>
                        <boxGeometry></boxGeometry>
                        <meshBasicMaterial color="red"></meshBasicMaterial>
                    </mesh>
                </>
            }>
                <mesh scale={[-10,10,10]} ref={videoSphereRef}>
                    <sphereGeometry></sphereGeometry>
                    <meshBasicMaterial 
                        color="lightblue" 
                        side={THREE.DoubleSide} >
                            <videoTexture attach="map" args={[video]} />
                        </meshBasicMaterial>
                </mesh>
            </Suspense>
            {/* A Test button for the cafe */}
            {showCafeButton && (<mesh position={[-10,0,-5] }>
                {/* <sphereGeometry></sphereGeometry> */}
                <Html>
                    <div onClick={function(){
                        descriptionHolder.style.visibility = "visible";
                        descriptionHolder.style.pointerEvents = "all";
                        openedWindow = true;
                        console.log("Clicked on button");
                    }} style={{zIndex: 2}}>
                        <h1 className='worldSpaceClickableButton'>Cafe Valvet</h1>
                    </div> 
                </Html>
                <meshBasicMaterial></meshBasicMaterial>
            </mesh> )}
            
        </>
    )
}



export default VideoScene;