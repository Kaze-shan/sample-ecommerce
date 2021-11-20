import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footerwrap">
            <div className="footer">
                <div className="footer__link">
                    <p>Contact Us </p>
                    <p>Japan</p>
                    <p>Taiwan</p>
                </div>
                <div className="footer__copyright-statement">
                    <p>© 2020 - 2021 Sample Company Limited.</p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
