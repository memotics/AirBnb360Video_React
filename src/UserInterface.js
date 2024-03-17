import React, { useState, useEffect } from 'react';

//currently this code is just for the controls button that shows at the start of the session

const UserInterface = () => {
  const [isVisible, setIsVisible] = useState(true); // Track visibility state

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false); // Set invisible after 5 seconds
    }, 5000); // Timeout in milliseconds (5 seconds)

    return () => clearTimeout(timeout); // Cleanup function for timeout
  }, []);

  return (
    <>
      <div
        className={isVisible ? '' : 'fade-out'} // Apply CSS class conditionally
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, color: 'black', display: 'flex', flexDirection: 'column', flexBasis: 'auto', pointerEvents: 'none', alignItems: 'center'}}
      >
            <h1 style={{margin: 0, padding: 0, textAlign: 'center', fontSize: '10vh'}}>Controls</h1>
            <img src={"https://th.bing.com/th/id/R.7242afe542a4a6e6eeed432e9ef59e9f?rik=7xVLpBssddF2Jg&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f7%2fGame-Controller-PNG-Transparent-Picture.png&ehk=5nKmFkeLNkX%2fRxJVuRw4PL6RUo3nxg9z8BKrENCxYlU%3d&risl=&pid=ImgRaw&r=0"} 
              alt="Control Image" 
              style={{ width: 'auto', 
                      height: 'auto',
                      maxHeight: '90%',
                      maxWidth: '90%', }} />
      </div>
    </>
  );
};

export default UserInterface;
