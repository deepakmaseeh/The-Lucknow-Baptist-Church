import React, { useState } from 'react';
import Footer from '../components/Footer';
import deepakImg from '../assets/images/deepak-maseeh.png';
import adityaImg from '../assets/images/aditya-singh.jpeg';
import amerdeepImg from '../assets/images/amerdeep-nand.jpeg';
import logoImg from '../assets/images/logo.png';

function About() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faithItems = [
    "God",
    "Jesus Christ",
    "The Holy Spirit",
    "The Bible",
    "Salvation",
    "The Church",
    "Baptism",
    "Communion",
    "The Return of Christ"
  ];
  const leadership = [
    { name: "Mr. Amerdeep Nand", role: "Lead Pastor", img: amerdeepImg },
    { name: "Mr. Deepak Maseeh", role: "Vice President", img: deepakImg },
    { name: "Mr. Aditya Singh", role: "Treasurer", img: adityaImg }
  ];

  const values = [
    { title: "Biblical Truth", icon: "📖" },
    { title: "Christ-Centered Worship", icon: "🙌" },
    { title: "Authentic Community", icon: "🤝" },
    { title: "Compassionate Service", icon: "❤" },
    { title: "Intentional Discipleship", icon: "🌱" }
  ];

  return (
    <>
      <div className="page-wrapper">
        
        {/* SECTION 1 — HERO */}
        <div className="about-hero">
          <div className="container">
            <h1 className="hero-heading">About Us</h1>
          </div>
        </div>

        {/* SECTION 2 — WHO IS THE CHURCH */}
        <section className="section section-white text-center">
          <div className="container container-center-text">
            <h2 className="section-title">Who Is The Lucknow Baptist Church in This World</h2>
            <p className="intro-text">
              The Lucknow Baptist Church exists to glorify God by making disciples of Jesus Christ. We desire to be a community of believers who are growing in faith, serving others, and living out the Gospel in everyday life.
            </p>
          </div>
        </section>

        {/* SECTION 3 — GATHER, GROW & ENGAGE */}
        <div className="gather-grow-section">
           <div className="gather-overlay">
              <h2>Gather<br/>Grow<br/>& Engage</h2>
           </div>
        </div>

        {/* SECTION 4 — MISSION STATEMENT */}
        <section className="section section-gold text-center">
          <div className="container">
            <h2 className="mission-text text-white">We are a church that is passionately following Christ together.</h2>
          </div>
        </section>

        {/* SECTION 5 — OUR VALUES */}
        <section className="section section-white">
          <div className="container">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
               {values.map((val, i) => (
                  <div key={i} className="value-card">
                     <div className="value-icon">{val.icon}</div>
                     <h3>{val.title}</h3>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — PARTNER AND EQUIP */}
        <section className="partner-equip-section">
           <div className="container">
              <h2 className="section-title">To Partner and Equip All People to Passionately Follow Christ Together</h2>
           </div>
        </section>

        {/* SECTION 7 — STATEMENT OF FAITH */}
        <section className="statement-of-faith-section">
           <div className="container">
              <h2 className="text-white">Statement of Faith</h2>
              <div className="accordion accordion-dark"> {/* Reusing accordion but ensuring dark theme compatibility if needed, or white on gold? Usually white card on gold. */}
                  {faithItems.map((item, index) => (
                    <div key={index} className="accordion-item item-white" onClick={() => toggleAccordion(index)}>
                      <div className="accordion-header">
                        <span>{item}</span>
                        <span className="accordion-icon">{activeAccordion === index ? '-' : '+'}</span>
                      </div>
                      {activeAccordion === index && (
                        <div className="accordion-content">
                           <p>We believe in the essential doctrines of the Christian faith regarding {item}. (Placeholder for full doctrinal statement)</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
           </div>
        </section>

        {/* SECTION 8 — BELIEFS AND PRACTICES */}
        <section className="section section-white">
           <div className="container container-narrow">
              <h2 className="section-title">The Lucknow Baptist Church’s Beliefs & Practices</h2>
              
              <div className="beliefs-content">
                 <h3>God’s Character</h3>
                 <p>We believe in one God, Creator of all things, holy, infinitely perfect, and eternally existing in a loving unity of three equally divine Persons: the Father, the Son and the Holy Spirit.</p>
                 
                 <h3>Jesus Christ</h3>
                 <p>We believe that Jesus Christ is God incarnate, fully God and fully man, one Person in two natures. Jesus—Israel's promised Messiah—was conceived through the Holy Spirit and born of the virgin Mary.</p>
                 
                 <h3>The Holy Spirit</h3>
                 <p>We believe that the Holy Spirit, in all that He does, glorifies the Lord Jesus Christ. He convicts the world of its guilt. He regenerates sinners, and in Him they are baptized into union with Christ and adopted as heirs in the family of God.</p>
                 
                 <h3>Scripture</h3>
                 <p>We believe that God has spoken in the Scriptures, both Old and New Testaments, through the words of human authors. As the verbally inspired Word of God, the Bible is without error in the original writings, the complete revelation of His will for salvation, and the ultimate authority by which every realm of human knowledge and endeavor should be judged.</p>
                 
                 <h3>Humanity & Sin</h3>
                 <p>We believe that God created Adam and Eve in His image, but they sinned when tempted by Satan. In union with Adam, human beings are sinners by nature and by choice, alienated from God, and under His wrath.</p>
                 
                 <h3>Salvation by Grace</h3>
                 <p>We believe that salvation is by grace alone through faith alone in Christ alone. No ordinance, ritual, work, or any other activity on the part of man is required or accepted in order to be saved.</p>
                 
                 <h3>Christian Living</h3>
                 <p>We believe that God's justifying grace must not be separated from His sanctifying power and purpose. God commands us to love Him supremely and others sacrificially, and to live out our faith with care for one another, compassion toward the poor, and justice for the oppressed.</p>
                 
                 <h3>The Church & Mission</h3>
                 <p>We believe that the true church comprises all who have been justified by God's grace through faith alone in Christ alone.</p>
                 
                 <h3>Ordinances</h3>
                 <p>We believe that the Lord Jesus prescribed two ordinances, Baptism and the Lord’s Supper. We believe in baptism by immersion for believers as a public witness to their faith.</p>
                 
                 <h3>Last Things</h3>
                 <p>We believe in the personal, bodily and glorious return of our Lord Jesus Christ. The coming of Christ, at a time known only to God, demands constant expectancy and, as our blessed hope, motivates the believer to godly living, sacrificial service and energetic mission.</p>
              </div>
           </div>
        </section>

        {/* SECTION 9 — LEADERSHIP TEAM */}
        <section className="section section-beige">
           <div className="container">
              <h2 className="section-title">Meet Our Leaders</h2>
              <div className="leadership-grid">
                 {leadership.map((leader, index) => (
                    <div key={index} className="leader-card">
                       <div className="leader-img" style={{ backgroundImage: `url('${leader.img}')` }}></div>
                       <div className="leader-info">
                          <h3>{leader.name}</h3>
                          <p>{leader.role}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* SECTION 10 — CONTACT FORM */}
        <section className="section section-white">
          <div className="container">
            <h2 className="section-title">Have questions about our beliefs, values or vision? Reach out!</h2>
            <form className="contact-form">
              <input type="text" placeholder="Name" className="form-input" />
              <input type="email" placeholder="Email" className="form-input" />
              <textarea placeholder="Your message" className="form-input form-textarea"></textarea>
              <button className="btn-gold">SUBMIT</button>
            </form>
          </div>
        </section>

       <Footer />
      </div>
    </>
  );
}

export default About;
