import React from 'react'
import "./Footer.css";

function Footer() {
    return (
        <footer id="footer">
            <div className="leftFooter">
              <p>Download App for Android and IOS mobile phone</p>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDXRf_CnMB-0aPiz_uBM6WfdFWuasWjMUmLhwiNNWg9hGrfJUIf6BcoJJ4H4EC1QFUKM&usqp=CAU" alt="playstore" />
              <img src="https://www.imprivata.com/sites/imprivata/files/inline-images/itunes-app-store-logo.png" alt="Appstore" />
            </div>

            <div className="midFooter">
              <h1>DEVENDRA E-COMMERCE.</h1>
              <p>High Quality is our first priority</p>

              <p>Copyrights 2021 &copy; MeDevendra</p>
            </div>

            <div className="rightFooter">
              <h4>Follow Us</h4>
              <a href="https://www.instagram.com/chydebendra/">Instagram</a>
              <a href="https://www.youtube.com/channel/UCCh4pSR5JXHQbINR-1P-MJg">Youtube</a>
              <a href="https://www.facebook.com/debendra.chy.7">Facebook</a>
            </div>
        </footer>
    )
}

export default Footer
