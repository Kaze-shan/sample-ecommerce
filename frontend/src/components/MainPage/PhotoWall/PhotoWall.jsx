import React, { useState, useEffect } from 'react';
import './PhotoWall.css';
import axios from '../../../axios';

function PhotoWall() {
    const [photowall, setPhotowall] = useState(null);

    useEffect(() => {
        axios
            .get('/api/v1/products/PhotoWall')
            .then(res => {
                setPhotowall(res.data.result);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="photowall">
            {photowall?.map(photo => (
                <div key={photo._id} className={`area${photo.name} photo`}>
                    <img src={photo.image} alt={photo.name} />
                </div>
            ))}
        </div>
    );
}

export default PhotoWall;
