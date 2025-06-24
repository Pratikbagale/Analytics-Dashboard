import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Alpha Superspeciality Hospital</h3>
                    <p>Providing world-class healthcare services with excellence.</p>
                </div>

                

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: support@alphahospital.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Address: 123 Healthcare Lane, Mumbai, India</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Alpha Superspeciality Hospital. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
