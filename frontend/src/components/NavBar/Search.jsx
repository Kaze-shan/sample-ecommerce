import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/index';

function Search() {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const { clearFilter } = bindActionCreators(actionCreators, dispatch);

    const searchSubmitHandler = e => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push({
                pathname: '/products/Search',
                search: `?keyword=${keyword}`,
            });

            //remove all filter data, wait for new data from database
            clearFilter();

            setKeyword('');
        } else {
            setKeyword('');
        }
    };

    return (
        <>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    value={keyword}
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={e => setKeyword(e.target.value)}
                />
                <div
                    className="searchiconholder"
                    onClick={searchSubmitHandler}
                    onKeyPress={searchSubmitHandler}
                    role="button"
                    tabIndex={0}
                >
                    <SearchIcon />
                </div>
            </form>
        </>
    );
}

export default Search;
