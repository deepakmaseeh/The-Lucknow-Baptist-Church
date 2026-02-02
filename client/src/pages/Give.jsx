import React from 'react';
import Footer from '../components/Footer';

function Give() {
  return (
    <div className="page-wrapper">
      <div className="connect-hero" style={{ height: '300px' }}>
        <div className="container">
          <h1 className="hero-heading">Give Online</h1>
        </div>
      </div>

      <section className="section section-white">
        <div className="container text-center">
          <h2 className="section-title">Generosity Changes Lives</h2>
          <p className="intro-text">
            Thank you for supporting The Lucknow Baptist Church. Your giving makes a difference in our community and around the world.
          </p>

          <div className="give-grid mt-20">
             <div className="give-card">
               <h3>One-Time Gift</h3>
               <p>Make a quick, secure one-time donation.</p>
               <div className="donation-amounts">
                 <button className="btn-outline-dark">$50</button>
                 <button className="btn-outline-dark">$100</button>
                 <button className="btn-outline-dark">$250</button>
                 <button className="btn-outline-dark">Custom</button>
               </div>
               <button className="btn-gold mt-20">GIVE NOW</button>
             </div>

             <div className="give-card">
               <h3>Recurring Giving</h3>
               <p>Set up a recurring donation to support the church consistently.</p>
               <button className="btn-dark mt-20">SETUP RECURRING</button>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Give;
