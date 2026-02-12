// Page templates for quick start

export const pageTemplates = {
    blank: {
        name: 'Blank Page',
        blocks: []
    },

    hero: {
        name: 'Hero Section',
        blocks: [
            {
                id: 'hero-section',
                type: 'section',
                props: {},
                styles: {
                    padding: '100px 40px',
                    backgroundColor: '#111111',
                    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textAlign: 'center',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            },
            {
                id: 'hero-heading',
                type: 'heading',
                props: { text: 'Welcome to Our Church', tag: 'h1' },
                styles: {
                    fontSize: '3.5rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '20px',
                    textAlign: 'center'
                }
            },
            {
                id: 'hero-paragraph',
                type: 'paragraph',
                props: { text: 'Join us in worship, fellowship, and service to our community.' },
                styles: {
                    fontSize: '1.25rem',
                    color: '#f0f0f0',
                    marginBottom: '40px',
                    maxWidth: '600px',
                    textAlign: 'center'
                }
            },
            {
                id: 'hero-button',
                type: 'button',
                props: { text: 'Visit Us', link: '/connect' },
                styles: {
                    padding: '15px 40px',
                    backgroundColor: '#D4AF37',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }
            }
        ]
    },

    about: {
        name: 'About Page',
        blocks: [
            {
                id: 'about-header',
                type: 'section',
                props: {},
                styles: {
                    padding: '60px 40px',
                    backgroundColor: '#f4f1ea',
                    textAlign: 'center'
                }
            },
            {
                id: 'about-title',
                type: 'heading',
                props: { text: 'About Our Church', tag: 'h1' },
                styles: {
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#111111',
                    marginBottom: '20px'
                }
            },
            {
                id: 'about-intro',
                type: 'paragraph',
                props: { text: 'We are a community of believers dedicated to sharing God\'s love.' },
                styles: {
                    fontSize: '1.2rem',
                    color: '#666666',
                    maxWidth: '700px',
                    margin: '0 auto'
                }
            },
            {
                id: 'about-content',
                type: 'section',
                props: {},
                styles: {
                    padding: '80px 40px',
                    backgroundColor: '#ffffff'
                }
            },
            {
                id: 'about-columns',
                type: 'columns',
                props: { count: 3 },
                styles: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '40px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }
            }
        ]
    },

    contact: {
        name: 'Contact Page',
        blocks: [
            {
                id: 'contact-header',
                type: 'section',
                props: {},
                styles: {
                    padding: '60px 40px',
                    backgroundColor: '#111111',
                    textAlign: 'center'
                }
            },
            {
                id: 'contact-title',
                type: 'heading',
                props: { text: 'Get In Touch', tag: 'h1' },
                styles: {
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '20px'
                }
            },
            {
                id: 'contact-subtitle',
                type: 'paragraph',
                props: { text: 'We\'d love to hear from you. Reach out anytime!' },
                styles: {
                    fontSize: '1.2rem',
                    color: '#f0f0f0'
                }
            },
            {
                id: 'contact-info',
                type: 'section',
                props: {},
                styles: {
                    padding: '80px 40px',
                    backgroundColor: '#ffffff',
                    maxWidth: '800px',
                    margin: '0 auto'
                }
            }
        ]
    },

    landing: {
        name: 'Landing Page',
        blocks: [
            {
                id: 'landing-hero',
                type: 'section',
                props: {},
                styles: {
                    padding: '120px 40px',
                    backgroundImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    textAlign: 'center'
                }
            },
            {
                id: 'landing-heading',
                type: 'heading',
                props: { text: 'Transform Your Life', tag: 'h1' },
                styles: {
                    fontSize: '4rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    marginBottom: '30px'
                }
            },
            {
                id: 'landing-cta',
                type: 'button',
                props: { text: 'Get Started', link: '#' },
                styles: {
                    padding: '18px 50px',
                    backgroundColor: '#ffffff',
                    color: '#4facfe',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                }
            },
            {
                id: 'landing-features',
                type: 'section',
                props: {},
                styles: {
                    padding: '100px 40px',
                    backgroundColor: '#ffffff'
                }
            },
            {
                id: 'landing-columns',
                type: 'columns',
                props: { count: 3 },
                styles: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '40px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }
            }
        ]
    }
};

export function getTemplate(templateId) {
    return pageTemplates[templateId] || pageTemplates.blank;
}
