import React from 'react';

function ImNew() {
  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501516095233-605f2c2515b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
        <div className="container">
          <h1>My First Visit</h1>
        </div>
      </div>
      
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">We Can’t Wait To Meet You!</h2>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            Join us this weekend! We have four worship services and Sunday Kids Ministry.
          </p>
        </div>
      </section>
      
      <section className="section">
         <div className="container">
            <h2 className="section-title">What To Expect</h2>
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
               <div style={{ padding: '30px', border: '1px solid #ddd' }}>
                  <h3>Kids</h3>
                  <p>A fun, safe environment for your children to learn about Jesus.</p>
               </div>
               <div style={{ padding: '30px', border: '1px solid #ddd' }}>
                  <h3>Youth</h3>
                  <p>Engaging worship and small groups for 6th-12th graders.</p>
               </div>
               <div style={{ padding: '30px', border: '1px solid #ddd' }}>
                  <h3>Adults</h3>
                  <p>Biblical teaching and dynamic worship in a welcoming atmosphere.</p>
               </div>
            </div>
         </div>
      </section>
    </>
  );
}

export default ImNew;
