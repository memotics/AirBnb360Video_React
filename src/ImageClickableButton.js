import { Html } from "@react-three/drei"; //Camera Controls
import React, { useState } from "react";
import ImageScreen from "./ImageScreen";
import Plaque from "./Primitives/Plague";


const ImageClickableButton = ({buttonName = "Add Name", buttonPosition = [-10,0,-5], closeButtonPosition = [8, 12, -12], rotation = [0,-1.64,0], scale = [-6,6,6], imgSrc = ""})=>
{
    const [opened, setOpened] = useState(false);
    return (
        <>
            <mesh position={buttonPosition}>
                {!opened && (<Html>
                    <div onClick={function(){
                        console.log("clicked");
                        setOpened(true);
                    }} style={{zIndex: 2}}>
                        <h1 className='worldSpaceClickableButton'>{buttonName}</h1>
                    </div> 
                </Html>)}
                {opened && (<Html position={closeButtonPosition}>
                    <div 
                        className='worldSpaceClickableButton'
                        style={{fontSize: "30px"}}
                        onClick={function(){
                            setOpened(false);}}>X</div>
                </Html>)}
            </mesh> 
            {opened && (<ImageScreen position={buttonPosition} rotation={rotation} scale={scale} srcDir={imgSrc}></ImageScreen>)}
        </>
    );
}

export default ImageClickableButton;