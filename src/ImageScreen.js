import { useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import CurvedPlane from "./CurvedPlane";


const ImageScreen = ({position = [-8,0,0], rotation = [0,-1.64,0], scale = [-6,6,6], srcDir = "./images/descriptionImages/CafeValvet.png"})=>
{
    return (
        <>
            <ambientLight intensity={2}></ambientLight>

            <Screen
                src = {srcDir}
                position={position}
                rotation={rotation}
                scale={scale}></Screen>
        </>
    );
}

export default ImageScreen;


function Screen({ src= "./images/descriptionImages/CafeValvet.png", rotation, scale, position }) {
  
    const ratio = 16 / 9
    const width = 5
    const radius = 4
    const z = 4
  
    const ScreenTexture = useTexture(src);

    return (
        <group position={position} scale={scale} rotation={rotation}>
            <CurvedPlane width={width} height={width / 16 * 9} radius={radius}>
                <meshStandardMaterial side={THREE.DoubleSide} map={ScreenTexture}/>
            </CurvedPlane>
        </group>
        
    )
  }