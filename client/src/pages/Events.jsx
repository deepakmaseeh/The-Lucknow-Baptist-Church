import React from 'react';
import Footer from '../components/Footer';

function Events() {
  // Curated list of high-quality Unsplash images for church events
  const eventImages = [
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80', // Gathering
    'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=400&q=80', // Bible
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=400&q=80', // Community
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80', // Study
    'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=400&q=80', // Prayer
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80', // Phone/App
    'https://images.unsplash.com/photo-1609234656388-0aa3641e2857?auto=format&fit=crop&w=400&q=80', // Kids
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=400&q=80', // Worship
    'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=400&q=80', // Cross
    'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=400&q=80', // Fall/Nature
    'https://images.unsplash.com/photo-1445023086979-7244a12345a8?auto=format&fit=crop&w=400&q=80', // Leaves
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80', // Youth
    'https://images.unsplash.com/photo-1475721027767-papi?auto=format&fit=crop&w=400&q=80', // Outdoor
    'https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?auto=format&fit=crop&w=400&q=80', // Nature
    'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=400&q=80'  // Light
  ];

  const allEvents = [
    { title: "Seniors Lunch", date: "Coming Soon" },
    { title: "Wednesday Nights", date: "Weekly" },
    { title: "Blast Kids", date: "Weekly" },
    { title: "Colossians – Men’s Bible Study", date: "Tuesdays" },
    { title: "Hosea – Men’s Bible Study", date: "Thursdays" },
    { title: "Colossians – Women’s Bible Study", date: "Wednesdays" },
    { title: "Caring for Congo – Project Meetings", date: "Monthly" },
    { title: "Community Night with Adult & Teen Challenge", date: "Special Event" },
    { title: "Old Paths New Power – Prayer Class", date: "Jan 11 – Feb 1" },
    { title: "Breakfast & Bible Study", date: "Saturdays" },
    { title: "Seniors Breakfast", date: "Monthly" },
    { title: "Serving for Congo – Project Nights", date: "TBA" },
    { title: "Women’s Spring Bible Study", date: "Spring 2026" },
    { title: "Psalms – Women’s Bible Study", date: "Spring 2026" },
    { title: "A Night of Worship and Prayer", date: "Monthly" },
    { title: "No Regrets Men’s Conference", date: "Feb 7, 2026" },
    { title: "Women’s Winter Retreat 2026", date: "Feb 13–15, 2026" },
    { title: "Practicing the Way – Men’s Bible Study", date: "Tuesdays" },
    { title: "Youth Pancake Night – Spring", date: "Spring 2026" },
    { title: "Ask & Answer Expert Dinner & Show", date: "Special Event" },
    { title: "Youth Worship Night", date: "Monthly" },
    { title: "Young Adult Winter Retreat", date: "Winter 2026" },
    { title: "Youth Spring Retreat", date: "Spring 2026" },
    { title: "Old Baptized", date: "Special Event" },
    { title: "Friday Morning Men’s Bible Study", date: "Fridays" },
    { title: "Seniors Sunday Morning Bible Study", date: "Sundays" },
    { title: "Senior Bible Study", date: "Weekly" },
    { title: "Church Centers", date: "Ongoing" }
  ];

  const recurringEvents = [
    "Wednesday Nights", 
    "Caring for Congo – Project Meetings", 
    "Zechariah – Men’s Bible Study", 
    "Seniors Breakfast", 
    "Caring for Congo – Project Nights", 
    "Friday Morning Men’s Bible Study"
  ];

  return (
    <>
      <div className="page-wrapper-events">
        
        {/* SECTION 1 — HERO */}
        <div className="events-hero">
          <div className="container">
            <h1 className="hero-heading">Events</h1>
            <div className="hero-btn-group-left">
                <button className="btn-gold">REQUEST AN EVENT & FACILITY USE</button>
                <button className="btn-gold">WHAT’S GOING ON AT THE CHURCH</button>
            </div>
          </div>
        </div>


        {/* SECTION 3 — ALL UPCOMING EVENTS */}
        <section className="section">
          <div className="container event-section-white">
            <h2 className="section-title">All Upcoming Events</h2>
            <div className="all-events-grid">
               {allEvents.map((evt, index) => (
                  <div key={index} className="event-card-small">
                     <div className="event-img-small" style={{ backgroundImage: `url('${eventImages[index % eventImages.length]}')` }}></div> 
                     <div className="event-text-small">
                        <h4>{evt.title}</h4>
                        <p>{evt.date}</p>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — RECURRING EVENTS */}
        <section className="section section-beige">
           <div className="container">
              <h2 className="section-title">Recurring Events</h2>
              <div className="all-events-grid">
                 {recurringEvents.map((title, i) => (
                    <div key={i} className="event-card-small card-beige-bg">
                       <div className="event-img-small" style={{ backgroundImage: `url('${eventImages[(i + 5) % eventImages.length]}')` }}></div> 
                       <div className="event-text-small">
                          <h4>{title}</h4>
                          <p>Recurring</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* SECTION 5 — FEATURED RECURRING EVENT */}
        <section className="section">
           <div className="container">
              <div className="feature-horizontal-card">
                 <div className="feature-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80')" }}></div>
                 <div className="feature-overlay">
                    <h2>Seniors Bible Study</h2>
                    <p>8:00 in the Chapel</p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 6 — CHURCH CENTER APP PROMO */}
        <section className="section">
           <div className="container app-promo-card">
              <div className="app-promo-content">
                 <h2>Church Center</h2>
                 <ul className="app-features">
                    <li>Service Times</li>
                    <li>Easy Giving</li>
                    <li>Event Signups</li>
                    <li>Community Connection</li>
                    <li>Family Pre-Check</li>
                 </ul>
                 <p className="app-text">The Church Center app helps you stay connected, find service times, give online, and register for events.</p>
                 <div className="app-btns">
                    <button className="btn-gold">DOWNLOAD ON THE APP STORE</button>
                    <button className="btn-gold">GET IT ON GOOGLE PLAY</button>
                 </div>
              </div>
              <div className="app-promo-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80')" }}></div>
           </div>
        </section>

       <Footer />
      </div>
    </>
  );
}

export default Events;
