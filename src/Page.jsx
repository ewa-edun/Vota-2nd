import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import './Page.css';

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [contactStatus, setContactStatus] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  const navLinks = [
    { to: "hero", label: "Home" },
    { to: "about", label: "About" },
    { to: "services", label: "Services" },
    { to: "process", label: "Process" },
    { to: "values", label: "Values" },
    { to: "faq", label: "FAQ" },
    { to: "contact", label: "Contact" }
  ];

  const faqData = [
    {
      question: "What types of loans do you offer?",
      answer: "We offer personal loans, business loans, and payday loans with flexible terms."
    },
    {
      question: "What are the eligibility requirements?",
      answer: "You must be 18+ years old, have a steady income, and valid identification."
    },
    {
      question: "How long does the approval process take?",
      answer: "Most applications are processed within 24 hours."
    },
    {
      question: "What are the interest rates?",
      answer: "There are low interest rates with no hidden charges."
    },
    {
      question: "When can I top-up?",
      answer: "3 to 6 months depending on your loan amount and type."
    }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      await emailjs.sendForm(
        'default_service', 
        'template_6q35cdg',
        e.target,
        'YXoZm3iH-rpbriSEF'
      );
      setContactStatus('success');
      e.target.reset();
    } catch (error) {
      setContactStatus('error');
      console.error('Error:', error);
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <header>
        <div className="logo">
          VOTA
        </div>
        <nav className={isMenuOpen ? 'active' : ''}>
          {navLinks.map((link) => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </ScrollLink>
          ))}
          <Link to="/apply" className="apply-btn">Apply Now</Link>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div className="hero-content">
          <h1>Fast & Reliable Loans with Vota</h1>
          <p>Get the funds you need with ease and transparency</p>
          <Link to="/apply" className="cta-button">
            Apply Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>At Vota Investment Ltd, we believe in making financial services accessible to everyone. Our mission is to provide quick, transparent, and reliable loan solutions that help you achieve your goals.</p>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <h2>Our Loan Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Personal Loans</h3>
            <p>Quick access to funds for personal needs</p>
          </div>
          <div className="service-card">
            <h3>Business Loans</h3>
            <p>Support for your business growth</p>
          </div>
          <div className="service-card">
            <h3>Payday Loans</h3>
            <p>Short-term solutions for immediate needs</p>
          </div>
          <div className="service-card">
            <h3>Investments</h3>
            <p>Secure investment options with competitive returns</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="process">
        <h2>How It Works</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Apply</h3>
            <p>Fill out our simple online application</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Approval</h3>
            <p>Quick review and approval process</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Disbursement</h3>
            <p>Receive your funds quickly</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="services">
        <h2>Our Values</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Integrity</h3>
            <p>Building trust through honest and transparent practices</p>
          </div>
          <div className="service-card">
            <h3>Excellence</h3>
            <p>Delivering outstanding service in everything we do</p>
          </div>
          <div className="service-card">
            <h3>The Extra Mile</h3>
            <p>Going beyond expectations to ensure your success</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <FontAwesomeIcon icon={faPhone} />
              <p>+2347011971774</p>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>contactus@vota.ng</p>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faLocationDot} />
              <p>Allen, Ikeja </p> 
            </div>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea name="message" placeholder="Message" required></textarea>
            <button type="submit" disabled={contactStatus === 'sending'}>
              {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {contactStatus === 'success' && <p className="success-message">Message sent successfully!</p>}
            {contactStatus === 'error' && <p className="error-message">Failed to send message. Please try again.</p>}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-links">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>
          <p className="copyright">© 2025 Vota Investment Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
