import React, { useState } from 'react';
import './Filter.css';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state/index';

function Filter({ filter, filterlist, setFilter, selected }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { clearCurrentPage, clearProduct } = bindActionCreators(actionCreators, dispatch);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleChange = subitem => {
        const newSelected = [...selected];
        const index = newSelected.indexOf(subitem.toUpperCase());

        // if selected, push it to selected array, else remove the item
        if (index === -1) {
            newSelected.push(subitem.toUpperCase());
            setFilter(newSelected);
        } else {
            newSelected.splice(index, 1);
            setFilter(newSelected);
        }

        //remove current product and page data, wait for new data from database
        clearCurrentPage();
        clearProduct();
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={filter} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse className="filterchild" in={open} timeout="auto" unmountOnExit>
                {filterlist.map(subitem => (
                    <FormControlLabel
                        key={subitem}
                        control={
                            <Checkbox onChange={() => handleChange(subitem, filter)} name={subitem} color="primary" />
                        }
                        label={subitem}
                        checked={selected.includes(subitem.toUpperCase())}
                    />
                ))}
            </Collapse>
        </>
    );
}

export default Filter;
