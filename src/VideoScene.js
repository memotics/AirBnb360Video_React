import * as THREE from 'three';
import { OrbitControls} from "@react-three/drei"; //Camera Controls
import { useFrame } from '@react-three/fiber';
import React, { Suspense, useState, useRef, useEffect } from "react";
import PhysicsParticles from './PhysicsParticles';
import ImageClickableButton from './ImageClickableButton';
import VideoClickableButton from './VideoClickableButton';
import { StoredData } from './Context';
import ArrowPointer from './Primitives/ArrowPointer';

//Code in here is meant for only threejs/webgl scene.

//some control variables
var openedWindow = false;
const instructions = document.getElementById('instructions');
const VideoScene = ()=>
{
    const [data, setData] = useState(false);
    //references
    const videoSphereRef = useRef();
    const videoChangeRate = 0.5;
    const videoPopUpNodeRange = 2;
    const [showCafeButton, setShowCafeButton]= useState(false);
    const [showCafeButton2, setShowCafeButton2]= useState(false);
    const [showPalaceButton, setShowPalaceButton]= useState(false);
    const [showPhysics, setShowPhysics]= useState(true);
    
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = "./videos/street360.mp4";
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.preload = "auto";
        return vid;
      });
    

    useEffect(() => {
        console.log("Binding Key presses");
        window.addEventListener('keydown', (event) => {
            if (openedWindow)
                return;
            if (event.key === 'ArrowUp' || event.key === 'w')
            {
                video.currentTime += videoChangeRate;
                
                //setShowPhysics(false);
                setData({...data, dropPhysics: true});
                instructions.style.visibility = 'hidden';
                if (setShowPhysics)
                {
                    setTimeout(() => {
                        // Code to be executed after x seconds
                        setShowPhysics(false);
                      }, 5 * 1000); // Convert x seconds to milliseconds
                }
                instructions.style.pointerEvents = 'none';
            }
            else if (event.key === 'ArrowDown' || event.key === 's')
            {
                video.currentTime -= videoChangeRate;
                //setShowPhysics(false);
                if (setShowPhysics)
                {
                    setTimeout(() => {
                        // Code to be executed after x seconds
                        setShowPhysics(false);
                      }, 5 * 1000); // Convert x seconds to milliseconds
                }
                setData({...data, dropPhysics: true});
                instructions.style.visibility = 'hidden';
            }
            setShowCafeButton2(video.currentTime >= 17.5 - videoPopUpNodeRange && video.currentTime <= 17.5 + videoPopUpNodeRange);
            setShowCafeButton(video.currentTime >= 22 - videoPopUpNodeRange && video.currentTime <= 22 + videoPopUpNodeRange);
            setShowPalaceButton(video.currentTime >= 33 - videoPopUpNodeRange && video.currentTime <= 33 + videoPopUpNodeRange);
        })
        window.addEventListener('wheel', (event)=>{
            if (openedWindow)
            return;
        if (event.deltaY > 0)
        {
            video.currentTime += videoChangeRate;
            // setShowPhysics(false);
            setData({...data, dropPhysics: true});
            instructions.style.visibility = 'hidden';
            if (setShowPhysics)
            {
                setTimeout(() => {
                    // Code to be executed after x seconds
                    setShowPhysics(false);
                  }, 5 * 1000); // Convert x seconds to milliseconds
            }
            setData({...data, dropPhysics: true});
        }
        else if (event.deltaY < 0)
        {
            video.currentTime -= videoChangeRate;
            // setShowPhysics(false);
            setData({...data, dropPhysics: true});
            if (setShowPhysics)
            {
                setTimeout(() => {
                    // Code to be executed after x seconds
                    setShowPhysics(false);
                  }, 5 * 1000); // Convert x seconds to milliseconds
            }
            instructions.style.visibility = 'hidden';
        }
        console.log("Current Time" + video.currentTime);
        setShowCafeButton2(video.currentTime >= 17.5 - videoPopUpNodeRange && video.currentTime <= 17.5 + videoPopUpNodeRange);
            setShowCafeButton(video.currentTime >= 22 - videoPopUpNodeRange && video.currentTime <= 22 + videoPopUpNodeRange);
            setShowPalaceButton(video.currentTime >= 33 - videoPopUpNodeRange && video.currentTime <= 33 + videoPopUpNodeRange);
    })
}, []);

useFrame((state, delta)=>{ //The Update function, runs each frame
    
});

return (
        <>
            <OrbitControls enableZoom={false} enablePan={false}></OrbitControls>
            <Suspense fallback={
                <>
                    <mesh>
                        <boxGeometry></boxGeometry>
                        <meshBasicMaterial color="red"></meshBasicMaterial>
                    </mesh>
                </>
            }>
                <mesh scale={[-90,90,90]} ref={videoSphereRef}>
                    <sphereGeometry></sphereGeometry>
                    <meshBasicMaterial 
                        color="white" 
                        side={THREE.DoubleSide} >
                            <videoTexture attach="map" args={[video]} />
                        </meshBasicMaterial>
                </mesh>
            </Suspense>
            {/* A Test button for the cafe */}
            {showCafeButton && (<ImageClickableButton buttonName='Cafe Valvet' imgSrc='./images/descriptionImages/CafeValvet.png'></ImageClickableButton>)}
            {showCafeButton2 && (<ImageClickableButton buttonName='Cafe Muren' imgSrc='./images/descriptionImages/CafeMuren.png' buttonPosition={[10,0,5]} closeButtonPosition={[-8, 12, 12]} rotation={[0, Math.PI * 0.5,0]}></ImageClickableButton>)}
            {showPalaceButton && (<VideoClickableButton src="./videos/SDW.mp4"></VideoClickableButton>)}
            <StoredData.Provider value={{data, setData}}>
                {showPhysics && (
                    <PhysicsParticles></PhysicsParticles>
                )}
            </StoredData.Provider>
            {/* <ArrowPointer></ArrowPointer> */}
        </>
    )
}



export default VideoScene;