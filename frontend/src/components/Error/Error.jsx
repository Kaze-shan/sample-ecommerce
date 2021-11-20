import React from 'react';
import './Error.css';
import errorIMG from '../../assets/404.jpg';

function Error() {
    return (
        <div className="errorpage">
            <img src={errorIMG} alt="404error" />
        </div>
    );
}

export default Error;
