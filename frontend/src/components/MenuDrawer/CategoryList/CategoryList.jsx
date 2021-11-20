import React, { useState } from 'react';
import './CategoryList.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

function CategoryList({ item, toggleDrawer, setOpendrawer }) {
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const dispatch = useDispatch();
    const { clearFilter } = bindActionCreators(actionCreators, dispatch);

    const handleClick = () => {
        setOpen(!open);
    };

    const selectProducts = (parentID, childID) => {
        history.push(`/productlist/${parentID}_${childID}`);
        //remove all filter data, wait for new data from database
        clearFilter();
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="ul" className="nestedlist">
                    {item.childID?.map(subitem => (
                        <ListItem
                            component="li"
                            button
                            key={subitem._id}
                            onClick={() => {
                                setOpendrawer(false);
                                selectProducts(item.name, subitem.name);
                            }}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemText primary={subitem.name} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </>
    );
}

export default CategoryList;
