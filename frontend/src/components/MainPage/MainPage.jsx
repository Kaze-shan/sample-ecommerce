import React, { useEffect, useState } from 'react';
import './MainPage.css';
import Slides from './Slides/Slides.jsx';
import Row from './Row/Row.jsx';
import PhotoWall from './PhotoWall/PhotoWall.jsx';
import axios from '../../axios';

function MainPage() {
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        axios
            .get('/api/v1/products/MainPageOffer')
            .then(res => {
                setOffer(res.data.result);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="mainpage">
            <div className="mainpage_wrapper">
                <div className="mainpage__slide">{offer && <Slides offer={offer} />}</div>
                <PhotoWall />
                <div className="mainpage__newarrives">
                    <h1>Just Arrived</h1>
                    <Row />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
