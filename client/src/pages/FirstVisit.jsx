import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function FirstVisit() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [
    "What do I wear?",
    "When should I arrive?",
    "What do you have for my kids?",
    "What’s your service like?",
    "How do I get connected at Bethany after the service is done?", // Intentionally keeping "Bethany" here as per "EXACTLY match provided content" instruction, even if I rebranded elsewhere. User said "Do not rewrite content". However, previous instruction Rebranded everything. I will use "The Lucknow Baptist Church" if the context implies the *current* church name, but strictly following the "EXACTLY match" block often implies copying the text block provided in the prompt. The prompt says "Do not remove or rewrite content." BUT earlier user asked to change name. I will fallback to "The Lucknow Baptist Church" for consistency if it feels like a placeholder, BUT strict obedience to the prompt text block usually wins. I will use "The Lucknow Baptist Church" because "Bethany" was explicitly asked to be changed globally. Actually, looking at the Prompt Text provided: "How do I get connected at Bethany...". I will swap to "The Lucknow Baptist Church" to be safe with the rebrand request."
    "What does The Lucknow Baptist Church offer outside of Sunday services?"
  ];

  /* 
   Re-reading strict instruction: "Generate this page EXACTLY as specified... Do not remove or rewrite content." 
   vs "change church name into The Lucknow Baptist Church". 
   I will use "The Lucknow Baptist Church" because that was a global rebrand request that logically overrides the static copy in the prompt which is likely pasted from the old site. 
   I will use "The Lucknow Baptist Church" for the church name.
  */

  return (
    <>
      <div className="page-wrapper">
        
        {/* SECTION 1 — HERO */}
        <div className="hero-first-visit">
          <div className="container">
            <h1 className="hero-heading">My First Visit</h1>
            <div className="hero-btn-group">
                <button className="btn-gold">WATCH ONLINE</button>
                <Link to="/connect#map" className="btn-gold">GET DIRECTIONS</Link>
            </div>
          </div>
        </div>

        {/* SECTION 2 — WELCOME INTRO */}
        <section className="section section-white text-center">
          <div className="container container-narrow">
            <h2 className="section-title">We Can’t Wait To Meet You!</h2>
            <p className="intro-text">
              Don’t worry about where you’re at spiritually or even what you should wear. We just want you to join us as we passionately follow Christ together. Let us help make your first visit at The Lucknow Baptist Church great.
            </p>
            <button className="btn-gold mt-20">WHAT WE BELIEVE</button>
          </div>
        </section>

        {/* SECTION 3 — JOIN US THIS SUNDAY */}
        <section className="section section-dark text-center">
          <div className="container">
            <h2 className="section-title text-white">Join Us This Sunday!</h2>
            <p className="intro-text text-light-gray">
              We meet every Sunday morning in person and online. We’d love to get to know you. Weekly online & in-person services with opening worship, teaching, time of prayer and reflection, and closing worship.
            </p>
            <div className="btn-group-center">
               <Link to="/connect#map" className="btn-gold">GET DIRECTIONS</Link>
               <button className="btn-gold">WATCH ONLINE</button>
            </div>

            <div className="dark-cards-grid">
               {/* Card 1 */}
               <div className="dark-card">
                  <h3>Four Worship Services</h3>
                  <p>We have Sunday worship services at 8:15am, 9:30am, and 10:45am. All services include worship, teaching, and prayer. Childcare is available during the 9:30am and 10:45am services. Our goal is to create an environment where everyone feels welcome and encouraged in their faith.</p>
               </div>
               {/* Card 2 */}
               <div className="dark-card">
                  <h3>Sunday Kids Ministry</h3>
                  <p>We will make kids feel differently than adults, but our classrooms are a high-energy environment focused on how to help kids understand the Bible. During our 8:15 & 9:30 services, childcare is available for nursery through preschool. During the 10:45 service, groups are available for kids through 5th grade. If you want to make your first family check-in easier, please fill out this form.</p>
                  <button className="btn-gold mt-20">FIRST FAMILY CHECK-IN</button>
               </div>
               {/* Card 3 */}
               <div className="dark-card">
                  <h3>You’re welcome here!</h3>
                  <p>We work hard to create a warm & welcoming environment at The Lucknow Baptist Church. That doesn’t disappear once the service is over. From coffee to friendly faces and conversation, we want you to feel at home.</p>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHAT TO EXPECT (FAQ) */}
        <section className="section section-white">
          <div className="container">
            <h2 className="section-title text-center">What to Expect on a Sunday</h2>
            <div className="accordion">
              {accordionItems.map((item, index) => (
                <div key={index} className="accordion-item" onClick={() => toggleAccordion(index)}>
                  <div className="accordion-header">
                    <span>{item.replace("Bethany", "The Lucknow Baptist Church")}</span>
                    <span className="accordion-icon">{activeAccordion === index ? '-' : '+'}</span>
                  </div>
                  {activeAccordion === index && (
                    <div className="accordion-content">
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — WE HAVE A PLACE FOR EVERYONE */}
        <section className="section section-gold">
          <div className="container">
            <h2 className="section-title text-white text-center">We have a place for everyone</h2>
            <div className="ministry-cards-grid">
               <div className="ministry-card-simple">
                  <div className="ministry-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=400&q=80')" }}></div>
                  <div className="ministry-content-simple">
                     <h3>Kids</h3>
                     <p>Our kids ministry is designed to be fun and engaging for kids from nursery to 5th grade. Our Kids Ministry is built on a partnership with both church and parents through parent involvement and we would love to have your family join us.</p>
                     <button className="btn-dark mt-20">LEARN MORE</button>
                  </div>
               </div>
               <div className="ministry-card-simple">
                  <div className="ministry-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80')" }}></div>
                  <div className="ministry-content-simple">
                     <h3>Youth</h3>
                     <p>Our Youth Ministry exists to move our students from 6th–12th grade toward spiritual maturity and growth through relationship with Jesus Christ. Through small groups, large gatherings, and serving within the church, our young people are growing closer to God and one another.</p>
                     <button className="btn-dark mt-20">LEARN MORE</button>
                  </div>
               </div>
               <div className="ministry-card-simple">
                  <div className="ministry-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=400&q=80')" }}></div>
                  <div className="ministry-content-simple">
                     <h3>Adults</h3>
                     <p>No matter what age or stage of life you’re in, we want you to belong at The Lucknow Baptist Church. Young Adults & College, Kids at Heart, Empty Nesters, and more—we want you connected in a community ready to grow alongside you.</p>
                     <button className="btn-dark mt-20">LEARN MORE</button>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — FIRST FAMILY CHECK-IN */}
        <section className="section section-overlay text-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1609234656388-0aa3641e2857?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
          <div className="container container-narrow text-white">
             <h2 className="section-title text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Make your first family check-in easier!</h2>
             <p className="intro-text" style={{ color: '#ffffff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>To make your Sunday mornings as smooth as possible, we encourage you to pre-register your family profile in advance. By clicking the link below, you can quickly provide us with important information about your children and your family’s needs. This will help prepare for your visit and ensure a smooth experience when you arrive.</p>
             <button className="btn-gold mt-20">FIRST FAMILY CHECK-IN</button>
          </div>
        </section>

        {/* SECTION 7 — WEEKLY OFFICE HOURS */}
        <section className="section section-beige text-center">
           <div className="container">
              <h2 className="section-title">Weekly Office Hours</h2>
              <div className="btn-group-center mb-30">
                 <button className="btn-gold">CALL US</button>
                 <button className="btn-gold">EMAIL US</button>
              </div>
              <p className="intro-text">Need to connect with us during the week? Great! Here’s when we are typically available. Hours may change based on holidays. We’d love to have you call or email us to set up an appointment.</p>
              
              <div className="office-hours-list">
                 <p>Monday: 9am – 4pm</p>
                 <p>Tuesday: 9am – 4pm</p>
                 <p>Wednesday: 9am – 4pm</p>
                 <p>Thursday: 9am – 4pm</p>
                 <p>Friday: Closed</p>
              </div>
           </div>
        </section>

        {/* SECTION 8 — LEARN MORE CTA */}
        <section className="section section-gold-gradient text-center">
           <div className="container">
              <h2 className="section-title text-white">Learn More About Who We Are & What We Believe.</h2>
              <div className="btn-group-center mt-20">
                 <button className="btn-outline-dark">ABOUT US</button>
                 <button className="btn-outline-dark">STAFF & ELDERS</button>
              </div>
           </div>
        </section>

       <Footer />
      </div>
    </>
  );
}

export default FirstVisit;
