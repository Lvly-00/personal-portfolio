import React from 'react';

const LoadingScreen = () => {


    return (
        <div className="loading-screen">
            <div className="loading-text">Loading...</div>

            <div className="loading-buttons hidden">
                <button className="loading-screen-button">Enter</button>
                <button className="no-sound-button">Enter without Sound :(</button>
            </div>

            <p className="desktop-instructions instructions">
                use left/right click and mouse wheel to navigate!
            </p>
            <p className="mobile-instructions instructions">
                use one or two fingers to navigate!
            </p>
        </div>

    );
};

export default LoadingScreen;