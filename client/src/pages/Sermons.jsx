import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import sermonHero from '../assets/sermon-hero.png';
import { getApiUrl } from '../utils/api';

function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingSermonId, setPlayingSermonId] = useState(null);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch(getApiUrl('/api/sermons'));
        const data = await response.json();
        setSermons(data);
      } catch (error) {
        console.error('Error fetching sermons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlayVideo = (id) => {
    setPlayingSermonId(id);
  };

  return (
    <>
      <div className="page-wrapper">

        {/* HERO SECTION - Inline Styles with Local Image */}
        <div style={{
          height: '50vh',
          minHeight: '400px',
          width: '100%',
          backgroundColor: '#222',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${sermonHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          marginBottom: '60px'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '4rem', 
              marginBottom: '10px', 
              fontFamily: 'var(--font-heading)',
              textShadow: '0 4px 15px rgba(0,0,0,0.5)',
              color: '#ffffff'
            }}>
              Sermon Archive
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto', 
              opacity: 1,
              fontWeight: 400, 
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              color: '#f0f0f0'
            }}>
              Watch recent messages and explore our library of biblical teaching.
            </p>
          </div>
        </div>

        {/* SERMONS GRID */}
        <section style={{ paddingBottom: '80px', backgroundColor: 'var(--beige-bg)' }}>
          <div className="container">
            
            {/* Filter Placeholder */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
               <button className="btn-gold" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Latest Messages</button>
               <button className="btn-outline-dark" style={{ color: '#333', borderColor: '#ddd' }}>By Series</button>
               <button className="btn-outline-dark" style={{ color: '#333', borderColor: '#ddd' }}>By Speaker</button>
               <button className="btn-outline-dark" style={{ color: '#333', borderColor: '#ddd' }}>Vision 2026</button>
            </div>

            {/* Grid */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#666' }}>Loading sermons...</div>
            ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '40px' 
            }}>
              {sermons.map(sermon => (
                <div key={sermon._id} style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.03)'
                }}
                >
                  {/* Image/Thumbnail or Video Player */}
                  <div style={{ 
                    height: '200px', 
                    position: 'relative',
                    width: '100%',
                    background: '#000'
                  }}>
                    {playingSermonId === sermon._id && sermon.videoUrl ? (
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${getYoutubeId(sermon.videoUrl)}?autoplay=1`} 
                            title={sermon.title}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                background: `url(${sermon.img}) center/cover no-repeat`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => handlePlayVideo(sermon._id)}
                        >
                            {/* Play Button Overlay */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.5rem',
                                backdropFilter: 'blur(5px)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                ▶
                            </div>
                            
                            <span style={{ 
                                position: 'absolute', 
                                bottom: '15px', 
                                left: '15px', 
                                background: 'var(--gold-color)', 
                                padding: '4px 10px', 
                                borderRadius: '4px', 
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                color: 'white'
                            }}>
                                {sermon.series}
                            </span>
                        </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '25px' }}>
                     <h3 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '8px', 
                      fontFamily: 'var(--font-main)', 
                      fontWeight: '700',
                      color: 'var(--primary-color)'
                    }}>
                      {sermon.title}
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                      <span>{sermon.speaker}</span>
                      <span>{sermon.date}</span>
                    </div>

                    <button 
                        className="btn-outline-dark full-width" 
                        style={{ width: '100%', borderColor: '#ddd', color: '#333' }}
                        onClick={() => handlePlayVideo(sermon._id)}
                    >
                      {playingSermonId === sermon._id ? 'Watching Now' : 'Watch Message'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button className="btn-gold">View Full Archive</button>
            </div>

          </div>
        </section>

        {/* Live Stream Promo */}
        <section className="section section-dark text-center">
            <div className="container container-narrow">
                <h2 className="section-title text-white">Join Us Live</h2>
                <p className="intro-text" style={{color: '#ccc'}}>Can't make it in person? We stream our 9:15 AM & 10:45 AM services every Sunday.</p>
                <button className="btn-gold mt-20">Watch Live Stream</button>
            </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Sermons;