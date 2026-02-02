import React, { useState } from 'react';
import Footer from '../components/Footer';

function Connect() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // MOCK SUBMISSION (Simulating EmailJS)
    // To implement real emails:
    // 1. npm install @emailjs/browser
    // 2. emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
    
    setTimeout(() => {
      console.log('Form Data Submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500); // Simulate network delay
  };

  return (
    <>
      {/* SECTION 1 — HERO */}
      <div className="connect-hero">
        <div className="container">
          <h1 className="hero-heading">Get Connected</h1>
        </div>
      </div>

      <div className="page-wrapper">
        {/* SECTION 2 — CONNECTION CARDS */}
        <section className="section section-white">
          <div className="container">
            <h2 className="section-title">Get Connected</h2>
            <div className="connection-cards-grid">
              {/* Card 1 */}
              <div className="connection-card">
                <h3>Connect With Us</h3>
                <p>Fill out a connection card so we can get you plugged in at The Lucknow Baptist Church, and so we can stay in touch.</p>
                <button className="btn-gold">CONNECTION CARD</button>
              </div>
              {/* Card 2 */}
              <div className="connection-card">
                <h3>Prayer Request</h3>
                <p>If you need prayer, feel free to share your request through the link below, and our team will be honored to join you in prayer.</p>
                <button className="btn-gold">SUBMIT A PRAYER REQUEST</button>
              </div>
              {/* Card 3 */}
              <div className="connection-card">
                <h3>Get Help</h3>
                <p>Everybody needs help sometimes, and our Deacons are here when that happens. If you attend The Lucknow Baptist Church and have physical or spiritual needs you need help with, get started here.</p>
                <button className="btn-gold">GET HELP</button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — FEATURED UPCOMING EVENTS */}
        <section className="section section-beige">
          <div className="container">
            <h2 className="section-title">Featured Upcoming Events</h2>
            <div className="events-grid">
              {/* Event 1 */}
              <div className="event-card">
                <div className="event-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=600&q=80')" }}></div>
                <div className="event-content">
                    <h3>Old Paths New Power – Prayer Class</h3>
                    <p className="event-date">January 11 – February 1, 2026</p>
                </div>
              </div>
              {/* Event 2 */}
              <div className="event-card">
                <div className="event-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80')" }}></div>
                <div className="event-content">
                   <h3>No Regrets Men’s Conference</h3>
                   <p className="event-date">February 7, 2026</p>
                </div>
              </div>
              {/* Event 3 */}
              <div className="event-card">
                <div className="event-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516315573458-132dca3260bd?auto=format&fit=crop&w=600&q=80')" }}></div>
                <div className="event-content">
                    <h3>Women’s Winter Retreat 2026</h3>
                    <p className="event-date">February 13–15, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — MORE HELPFUL LINKS */}
        <section className="section section-white">
          <div className="container">
            <h2 className="section-title">More Helpful Links</h2>
            <div className="helpful-links-grid">
              {/* Column 1 */}
              <div className="helpful-col">
                <div className="icon-circle">❤️</div>
                <h3>Volunteer & Membership</h3>
                <p>Interested in volunteering or becoming an official member? Start filling out one of these forms, depending on your age.</p>
                <div className="btn-stack">
                  <button className="btn-gold">VOLUNTEER & MEMBERSHIP FORM</button>
                  <button className="btn-gold">YOUTH VOLUNTEER FORM (FOR AGES 8–17)</button>
                </div>
              </div>
              {/* Column 2 */}
              <div className="helpful-col">
                <div className="icon-circle">🤲</div>
                <h3>Give</h3>
                <p>If you’re ready to give to The Lucknow Baptist Church, giving online is safe and easy! If you’d rather give in person, you’re welcome to give during one of our services.</p>
                <button className="btn-gold">GIVE</button>
              </div>
              {/* Column 3 */}
              <div className="helpful-col">
                <div className="icon-circle">📱</div>
                <h3>Get Our App</h3>
                <p>The Church Center app has a lot of resources to help you at The Lucknow Baptist Church, including viewing and registering for events. It’s organized in a way that’s helpful for members and regular attenders.</p>
                <p>You can download the Church Center App on the app store that’s right for your phone. (When installing, look for our logo.)</p>
                <div className="btn-stack">
                  <button className="btn-gold">APPLE APP STORE</button>
                  <button className="btn-gold">GOOGLE PLAY STORE</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — CONTACT FORM */}
        <section className="section section-gold">
          <div className="container">
            <h2 className="section-title text-white">General questions? Get ahold of us here!</h2>
            
            {status === 'success' ? (
              <div className="success-message" style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ color: 'var(--gold-color)', marginBottom: '10px' }}>Message Sent!</h3>
                <p style={{ color: '#333' }}>Thank you for reaching out. We've received your message and will get back to you shortly.</p>
                <button 
                  className="btn-gold mt-20" 
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  className="form-input" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  className="form-input" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea 
                  name="message" 
                  placeholder="Your message" 
                  className="form-input form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button className="btn-dark" disabled={status === 'sending'}>
                  {status === 'sending' ? 'SENDING...' : 'SUBMIT'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* SECTION 6 — MAP */}
        <div className="section" id="map">
           <iframe 
             title="Church Location"
             src="https://maps.google.com/maps?q=26.895181027527915,81.03738561272047&z=15&output=embed" 
             width="100%" 
             height="450" 
             style={{ border: 0 }} 
             allowFullScreen="" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade">
           </iframe>
        </div>

        {/* SECTION 7 — APPAREL & MERCH STORE */}
        <section className="section section-beige text-center">
          <div className="container">
            <h2 className="section-title">Church Apparel & Merch Store</h2>
            <p className="merch-text">
              All net profits from the apparel store go to scholarships for short-term mission trips. So you can rep your church in style and support short-term missions at the same time.
            </p>
            <p className="merch-text">
              Our apparel & merch store is always available online, so you can order whenever you like. We have Church hats, hoodies, t-shirts, mugs, notebooks, and all sorts of great items for men, women & kids.
            </p>
            <button className="btn-gold mt-4">LEARN MORE</button>
          </div>
        </section>

       <Footer />
      </div>
    </>
  );
}

export default Connect;
