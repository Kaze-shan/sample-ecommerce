import React, { useState, useEffect } from 'react';
import './PriceSlider.css';
import Slider from '@mui/material/Slider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state/index';

const valuetext = price => {
    return `$${price}`;
};

const marks = [
    {
        value: 0,
        label: '$0',
    },
    {
        value: 1000,
        label: '$1000',
    },
];

function PriceSlider({ setPrice }) {
    const { price } = useSelector(state => state.filter);
    const [localPrice, setLocalPrice] = useState(price);
    const dispatch = useDispatch();
    const { clearCurrentPage, clearProduct } = bindActionCreators(actionCreators, dispatch);

    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setLocalPrice(newValue);
        //change the local Selector if on change, so the slider will not send data everytime to DB onChange
    };

    const handleUpdate = (event, newValue) => {
        //send to DB when the user stop sliding
        setPrice(newValue);

        //remove current product and page data, wait for new data from database
        clearCurrentPage();
        clearProduct();
    };

    useEffect(() => {
        setLocalPrice(price);
    }, [price]);

    return (
        <>
            <ListItem>
                <ListItemText primary={'PRICE'} />
            </ListItem>
            <div className="slidercontainer">
                <Slider
                    getAriaLabel={() => 'Price Range'}
                    value={localPrice}
                    onChange={handleChange}
                    onChangeCommitted={handleUpdate}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={1000}
                    marks={marks}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${
                                    theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'
                                }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
            </div>
        </>
    );
}

export default PriceSlider;
