import * as THREE from 'three';
import { Html, OrbitControls, Preload } from "@react-three/drei"; //Camera Controls
import { useFrame } from '@react-three/fiber';
import React, { Suspense, useState, useRef, useEffect } from "react";
import ClickableButton from './ImageClickableButton';
import PhysicsParticles from './PhysicsParticles';
import ImageClickableButton from './ImageClickableButton';
import VideoClickableButton from './VideoClickableButton';
import VideoScreen from './VideoScreen';

//Code in here is meant for only threejs/webgl scene.

//some control variables
var openedWindow = false;
const instructions = document.getElementById('instructions');
const VideoScene = ()=>
{
    //references
    const videoSphereRef = useRef();
    const videoChangeRate = 0.5;
    // const videoPopUpNodeRange = 0.5;
    const [showCafeButton, setShowCafeButton]= useState(false);
    const [showPalaceButton, setShowPalaceButton]= useState(false);
    const [showPhysics, setShowPhysics]= useState(true);
    const [dropPhysicss, setDropPhysicss]= useState(false);
    
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.preload = "true";
        vid.src = "./videos/street360.mp4";
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.loop = false;
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
                setDropPhysicss(true);
                instructions.style.visibility = 'hidden';
                instructions.style.pointerEvents = 'none';
            }
            else if (event.key === 'ArrowDown' || event.key === 's')
            {
                video.currentTime -= videoChangeRate;
                //setShowPhysics(false);
                setDropPhysicss(true);
                instructions.style.visibility = 'hidden';
            }
            console.log("Current Time" + video.currentTime);
            setShowCafeButton(video.currentTime === 22);
            setShowPalaceButton(video.currentTime === 33);
        })
        window.addEventListener('wheel', (event)=>{
            if (openedWindow)
            return;
        if (event.deltaY > 0)
        {
            video.currentTime += videoChangeRate;
            // setShowPhysics(false);
            setDropPhysicss(true);
            console.log("DROP" + dropPhysicss);
            instructions.style.visibility = 'hidden';
        }
        else if (event.deltaY < 0)
        {
            video.currentTime -= videoChangeRate;
            // setShowPhysics(false);
            setDropPhysicss(true);
            console.log("DROP" + dropPhysicss);
            instructions.style.visibility = 'hidden';
        }
        console.log("Current Time" + video.currentTime);
        setShowCafeButton(video.currentTime === 22);
        setShowPalaceButton(video.currentTime === 33);
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
                <mesh scale={[-90,90,90]} ref={videoSphereRef}>
                    <sphereGeometry></sphereGeometry>
                    <meshBasicMaterial 
                        color="lightblue" 
                        side={THREE.DoubleSide} >
                            <videoTexture attach="map" args={[video]} />
                        </meshBasicMaterial>
                </mesh>
            </Suspense>
            {/* A Test button for the cafe */}
            {showCafeButton && (<ImageClickableButton buttonName='Cafe Valvet' imgSrc='./images/descriptionImages/CafeValvet.png'></ImageClickableButton>)}
            {showCafeButton && (<ImageClickableButton buttonName='Cafe Muren' imgSrc='./images/descriptionImages/CafeMuren.png' buttonPosition={[10,0,5]} closeButtonPosition={[-8, 12, 12]} rotation={[0, Math.PI * 0.5,0]}></ImageClickableButton>)}
            {showPalaceButton && (<VideoClickableButton src="./videos/SDW.mp4"></VideoClickableButton>)}
            {showPhysics && (
                <PhysicsParticles dropPhysics={showPhysics}></PhysicsParticles>
            )}
        </>
    )
}



export default VideoScene;