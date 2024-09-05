import React from 'react';
import '../Footer/Footer.css';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';
import pinterest from '../../assets/pinterest.png';
import tiktok from '../../assets/tiktok.png';
import logo from "../../assets/H&M_logo.png";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__section">
          <h3 className="footer__title">SHOP</h3>
          <a href="#" className="footer__link">Ladies</a>
          <a href="#" className="footer__link">Men</a>
          <a href="#" className="footer__link">Baby</a>
          <a href="#" className="footer__link">Kids</a>
          <a href="#" className="footer__link">H&M HOME</a>
          <a href="#" className="footer__link">Sport</a>
          <a href="/newsletter" className="footer__link">Magazine</a>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">CORPORATE INFO</h3>
          <a href="#" className="footer__link">Career at H&M</a>
          <a href="#" className="footer__link">About H&M group</a>
          <a href="#" className="footer__link">Sustainability H&M Group</a>
          <a href="#" className="footer__link">Press</a>
          <a href="#" className="footer__link">Investor relations</a>
          <a href="#" className="footer__link">Corporate governance</a>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">HELP</h3>
          <a href="/customer-service" className="footer__link">Customer Service</a>
          <a href="#" className="footer__link">My H&M</a>
          <a href="/find-store" className="footer__link">Find a store</a>
          <a href="#" className="footer__link">Legal & Privacy</a>
          <a href="#" className="footer__link">Contact</a>
          <a href="#" className="footer__link">Report a scam</a>
          <a href="#" className="footer__link">Cookie Notice</a>
          <a href="#" className="footer__link">Cookie Settings</a>
        </div>
        <div className="footer__section">
          <p>Sign up now and be the first to<br/> know about exclusive offers,<br/> latest fashion news & style tips!</p>
          <a href="#" className="footer__link"><b>Read more </b></a>
        </div>
      </div>
      <br/>
      <div className='platform'> 
          <a href="https://www.instagram.com/hm/" className="image"><img src={instagram} alt="instagram" /></a>
          <a href="https://www.tiktok.com/" className="image"><img src={tiktok} alt="tiktok" /></a>
          <a href="https://www.youtube.com/user/hennesandmauritz" className="image"><img src={youtube} alt="youtube" /></a>
          <a href="https://in.pinterest.com/hm/" className="image"><img src={pinterest} alt="pinterest" /></a>
          <a href="https://www.facebook.com/hm" className="image"><img src={facebook} alt="facebook" /></a>
          </div>
      <div className="footer__bottom">
        <p className="footer__text">© 2024 H&M Group. All rights reserved.</p>
      </div>
      <div className="logo">
                    <img src={logo} alt="H&M Logo" />
                </div>
                <p>INDIA | Rs.</p>
    </footer>
  );
};
export default Footer;