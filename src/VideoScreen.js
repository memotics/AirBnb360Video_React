import * as THREE from 'three'
import { useState, Suspense, useMemo } from 'react'
import { useVideoTexture, Center } from '@react-three/drei'
import CurvedPlane from "./CurvedPlane";


const VideoScreen = (src)=>
{
  
    const ratio = 16 / 9
    const width = 5
    const radius = 4
    const z = 4

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
  
    const r = useMemo(() => (video ? video.videoWidth / video.videoHeight : ratio), [video, ratio])
  
    return (
        <CurvedPlane width={width} height={width / r} radius={radius}>
            <meshBasicMaterial 
                color="lightblue" 
                side={THREE.DoubleSide} >
                    <videoTexture attach="map" args={[video]} />
            </meshBasicMaterial>
        </CurvedPlane>
    )
  }

export default VideoScreen;