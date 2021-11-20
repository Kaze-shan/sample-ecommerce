import React, { useState, useEffect } from 'react';
import './MenuDrawer.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import CategoryList from './CategoryList/CategoryList.jsx';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';

function MenuDrawer() {
    const [opendrawer, setOpendrawer] = useState(false);
    const [category, setCategory] = useState(null);
    const history = useHistory();

    const useStyles = makeStyles({
        list: {
            maxWidth: 400,
            width: '90vw',
        },
    });

    const classes = useStyles();

    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpendrawer(open);
    };

    const switchHome = () => {
        history.push(`/`);
        setOpendrawer(false);
    };

    const list = () => (
        <div className={classes.list} role="presentation">
            <div className="menudrawerlogo" onClick={switchHome} onKeyPress={switchHome} role="button" tabIndex={0}>
                <p>Sample</p>
            </div>
            <Divider />
            <List>
                {category?.map(item => (
                    <CategoryList
                        item={item}
                        key={item.name}
                        setOpendrawer={setOpendrawer}
                        toggleDrawer={toggleDrawer}
                    />
                ))}
            </List>
            <Divider />
        </div>
    );

    useEffect(() => {
        axios
            .get('/api/v1/products/catergorylist')
            .then(res => {
                setCategory(res.data.result);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="menudrawer">
            <IconButton aria-label="Show Menu" color="inherit" onClick={toggleDrawer(true)}>
                <DehazeIcon />
            </IconButton>
            <Drawer anchor="left" open={opendrawer} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    );
}

export default MenuDrawer;
