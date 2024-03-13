import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Canvas } from "@react-three/fiber"
import reportWebVitals from './reportWebVitals';
import VideoScene from "./VideoScene"
import { isMobile, MobileView } from 'react-device-detect';
import UserInterface from './UserInterface';

//function for when the canvas is loaded in
const creatingCanvasHandler = (state) => {
  state.gl.setClearColor("grey", 1.0); //set the background color
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <UserInterface></UserInterface>
    <div className='canvasContainer'> 
      <div id="descriptionHolder"></div>
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        onCreated={creatingCanvasHandler}>
        <VideoScene></VideoScene>
      </Canvas>
      
    </div>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
