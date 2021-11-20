import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state/index';
import { ProductDetailContext } from '../ProductDetail.jsx';
import './ProductBreadCrumb.css';

function ProductBreadCrumb({ breadcrumb }) {
    const dispatch = useDispatch();
    const { clearFilter } = bindActionCreators(actionCreators, dispatch);
    const { product } = useContext(ProductDetailContext);
    const history = useHistory();

    const handleBreadcrumbClick = (breadcrumblocalstring, listitem) => {
        history.push(
            `/productlist/${breadcrumblocalstring.slice(0, breadcrumblocalstring.indexOf(listitem) + listitem.length)}`,
        );
        clearFilter();
    };

    const renderBreadcrumb = () => {
        let breadcrumblocalstring = '';

        const loop = breadcrumb => {
            if (breadcrumb.parentID === null) {
                breadcrumblocalstring = breadcrumb.name;
                return;
            } else {
                loop(breadcrumb.parentID);
            }
            breadcrumblocalstring = breadcrumblocalstring + '_' + breadcrumb.name;
        };

        loop(breadcrumb);

        breadcrumblocalstring = breadcrumblocalstring + '_' + product.category;

        const breadcrumblocal = breadcrumblocalstring.split('_');

        return breadcrumblocal.map((listitem, index) => {
            if (index === breadcrumblocal.length - 1) {
                return (
                    <div className="guide__item" key={listitem}>
                        {listitem.toUpperCase()}
                    </div>
                );
            } else {
                return (
                    <div className="guide__item" key={listitem}>
                        <span
                            onClick={() => handleBreadcrumbClick(breadcrumblocalstring, listitem)}
                            onKeyPress={() => handleBreadcrumbClick(breadcrumblocalstring, listitem)}
                            role="button"
                            tabIndex={index}
                        >
                            {listitem.toUpperCase()}
                        </span>
                        <ChevronRightIcon />
                    </div>
                );
            }
        });
    };

    return <ul className="guide">{breadcrumb && renderBreadcrumb()}</ul>;
}

export default ProductBreadCrumb;
