import React from 'react';
import './Slides.css';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function Slides({ offer }) {
    return (
        <>
            <CarouselProvider
                isPlaying
                interval={3000}
                naturalSlideWidth={100}
                naturalSlideHeight={65}
                isIntrinsicHeight
                totalSlides={offer ? offer.length : 0}
                hasMasterSpinner
                infinite
            >
                <Slider>
                    {offer?.map((item, index) => (
                        <Slide index={index} key={item._id}>
                            <Image src={item.image} alt={item.name} />
                        </Slide>
                    ))}
                </Slider>
                <div className="slidebuttons">
                    <ButtonBack className="slideButton">
                        <KeyboardArrowLeft size="small" />
                    </ButtonBack>
                    <ButtonNext className="slideButton">
                        <KeyboardArrowRight />
                    </ButtonNext>
                </div>
            </CarouselProvider>
        </>
    );
}

export default Slides;
