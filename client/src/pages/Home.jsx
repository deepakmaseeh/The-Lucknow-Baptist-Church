import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import PlanVisitModal from '../components/PlanVisitModal';
import ImageModal from '../components/ImageModal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openLightbox = (src) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  const ministries = [
    { title: 'Kids', img: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80' },
    { title: 'Youth', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80' },
    { title: 'Grow Groups', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80' },
    { title: 'College', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80' },
    { title: 'Women', img: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80' },
    { title: 'Men', img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=600&q=80' },
    { title: 'Seniors', img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <header className="hero-home">
        <div className="container">
          <h1 className="hero-heading">Passionately Following Christ Together.</h1>
          <p className="intro-text text-white">Welcome to The Lucknow Baptist Church. Join us this weekend!</p>
          <div className="hero-btn-group">
            <button className="btn-gold" onClick={openModal}>Plan A Visit</button>
            <button className="btn-outline-dark text-white" style={{borderColor: 'white'}}>Watch Live</button>
          </div>
        </div>
      </header>

      <PlanVisitModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Service Times */}
      <section className="section section-beige">
        <div className="container">
          <h2 className="section-title">Service Times</h2>
          <div className="service-times-grid">
            <div className="time-card-home">
              <h3>Traditional</h3>
              <p className="time-big">8:15 AM</p>
            </div>
            <div className="time-card-home">
              <h3>Contemporary</h3>
              <p className="time-big">9:15 AM & 10:45 AM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">There's a Place For You Here</h2>
          <div className="ministry-grid">
            {ministries.map((item, index) => (
              <div key={index} className="ministry-card">
                <div className="ministry-img" style={{ backgroundImage: `url('${item.img}')` }}></div>
                <div className="ministry-overlay-text">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-20">
             <Link to="/connect" className="btn-gold">View More Ministries</Link>
          </div>
        </div>
      </section>

      {/* Latest Sermon Section */}
      <section className="section section-beige">
        <div className="container">
           <h2 className="section-title">Latest Message</h2>
           <div className="sermon-preview-card" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <div style={{ position: 'relative', height: '400px', background: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80') center/cover" }}>
                  <Link to="/sermons" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', textDecoration: 'none' }}>
                     <span style={{ fontSize: '4rem', color: 'white', opacity: 0.9 }}>▶</span>
                  </Link>
              </div>
              <div style={{ padding: '30px', textAlign: 'center' }}>
                 <p style={{ color: 'var(--gold-color)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Series: The Book of James</p>
                 <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Walking in Faith</h3>
                 <p style={{ color: '#666', marginBottom: '20px' }}>Pastor John Doe • January 26, 2026</p>
                 <Link to="/sermons" className="btn-dark">Watch Full Series</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Life at Lucknow Baptist (Gallery) */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Life at Lucknow Baptist</h2>
          <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
             <img 
               src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80" 
               alt="Community" 
               style={{ width: '100%', borderRadius: '8px', height: '200px', objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.2s' }} 
               onClick={() => openLightbox("https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80")}
               onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
               onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
             />
             <img 
               src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80" 
               alt="Worship" 
               style={{ width: '100%', borderRadius: '8px', height: '200px', objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.2s' }} 
               onClick={() => openLightbox("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80")}
               onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
               onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
             />
             <img 
               src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=600&q=80" 
               alt="Kids" 
               style={{ width: '100%', borderRadius: '8px', height: '200px', objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.2s' }} 
               onClick={() => openLightbox("https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80")}
               onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
               onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
             />
             <img 
               src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80" 
               alt="Study" 
               style={{ width: '100%', borderRadius: '8px', height: '200px', objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.2s' }} 
               onClick={() => openLightbox("https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80")}
               onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
               onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
             />
          </div>
        </div>
      </section>

      <ImageModal 
        isOpen={lightboxOpen} 
        imageSrc={lightboxSrc} 
        onClose={() => setLightboxOpen(false)} 
      />

       <Footer />
    </div>
  );
}

export default Home;
