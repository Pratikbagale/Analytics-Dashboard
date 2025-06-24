import React from "react";
import "./Footer.css"

function Footer() {
    return(
        <>
        <footer className="footer">
            
            <div className="footer-content">

                <p className="footer-text">
                    &copy; {new Date().getFullYear()} Covid-19 Analytics Dashboard. All Rights Reserved.
                </p>
            </div>

        </footer>
        </>
    );
}

export default Footer;