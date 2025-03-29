import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Apply.css';

const Apply = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      surname: '',
      firstName: '',
      otherNames: '',
      age: '',
      phone: '',
      email: '',
      address: '',
      dateOfBirth: '',
      maritalStatus: '',
      numberOfChildren: ''
    },
    loanInfo: {
      amount: '',
      amountInWords: '',
      purpose: '',
      term: '',
      collateralType: '',
      collateralValue: '',
      outstandingLoans: ''
    }
  });

  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    const emailParams = {
      to_email: 'contactus@vota.ng',
      from_name: `${formData.personalInfo.surname} ${formData.personalInfo.firstName}`,
      from_email: formData.personalInfo.email,
      message: `
        Personal Information:
        Full Name: ${formData.personalInfo.surname} ${formData.personalInfo.firstName} ${formData.personalInfo.otherNames}
        Age: ${formData.personalInfo.age}
        Phone: ${formData.personalInfo.phone}
        Email: ${formData.personalInfo.email}
        Home Address: ${formData.personalInfo.address}
        Date of Birth: ${formData.personalInfo.dateOfBirth}
        Marital Status: ${formData.personalInfo.maritalStatus}
        Number of Children: ${formData.personalInfo.numberOfChildren}

        Loan Information:
        Amount: ₦${formData.loanInfo.amount}
        Amount in Words: ${formData.loanInfo.amountInWords}
        Purpose: ${formData.loanInfo.purpose}
        Term: ${formData.loanInfo.term} months
        Collateral Type: ${formData.loanInfo.collateralType}
        Collateral Value: ₦${formData.loanInfo.collateralValue}
        Outstanding Loans: ${formData.loanInfo.outstandingLoans}
      `
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        'template_dhdtzlo',
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      setFormData({
        personalInfo: { surname: '', firstName: '', otherNames: '', age: '', phone: '', email: '', address: '', dateOfBirth: '', maritalStatus: '', numberOfChildren: '' },
        loanInfo: { amount: '', amountInWords: '', purpose: '', term: '', collateralType: '', collateralValue: '', outstandingLoans: '' }
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error:', error);
    }
  };

  return (
    <div className="apply-page">
      <Link to="/" className="back-button">← Back to Home</Link>
      
      <div className="apply-container">
        <h1>Loan Rules</h1>
        <ul>
          <li>Duly filled Loan request form.</li>
          <li>Interest Rate: 5%</li>
          <li>All expenses incurred by VOTA INVESTMENT LTD. for legal, perfection, and recovery in case of default that may arise from this loan shall be borne by the applicant.</li>
          <li>Advance payment of administrative fee (₦2,000) or 1% of principal, whichever is greater.</li>
          <li>We do not encourage cash transactions and we do not encourage rollovers.</li>
          <li>Please be informed that where you do not want your cheque to be presented, kindly make an equivalent of cash available 24 hours prior to the due date of presenting your cheque.</li>
          <li>A returned cheque shall attract a fine of ₦2,500 only.</li>
        </ul>
      </div>

      <div className="apply-container">
        <h1>Loan Application Form</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <section className="form-section">
            <h2>Personal Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Surname</label>
                <input
                  type="text"
                  name="surname"
                  required
                  value={formData.personalInfo.surname}
                  onChange={(e) => handleChange('personalInfo', 'surname', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleChange('personalInfo', 'firstName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Other Name(s)</label>
                <input
                  type="text"
                  name="otherNames"
                  required
                  value={formData.personalInfo.otherNames}
                  onChange={(e) => handleChange('personalInfo', 'otherNames', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  required
                  value={formData.personalInfo.age}
                  onChange={(e) => handleChange('personalInfo', 'age', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.personalInfo.email}
                  onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Home Address</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.address}
                  onChange={(e) => handleChange('personalInfo', 'address', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  required
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => handleChange('personalInfo', 'dateOfBirth', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Marital Status</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.maritalStatus}
                  onChange={(e) => handleChange('personalInfo', 'maritalStatus', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Number of Children</label>
                <input
                  type="number"
                  required
                  value={formData.personalInfo.numberOfChildren}
                  onChange={(e) => handleChange('personalInfo', 'numberOfChildren', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Loan Information */}
          <section className="form-section">
            <h2>Loan Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Loan Amount (₦)</label>
                <input
                  type="number"
                  required
                  value={formData.loanInfo.amount}
                  onChange={(e) => handleChange('loanInfo', 'amount', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Loan Amount in full words</label>
                <input
                  type="text"
                  required
                  value={formData.loanInfo.amountInWords}
                  onChange={(e) => handleChange('loanInfo', 'amountInWords', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Loan Purpose</label>
                <select
                  required
                  value={formData.loanInfo.purpose}
                  onChange={(e) => handleChange('loanInfo', 'purpose', e.target.value)}
                >
                  <option value="">Select Purpose</option>
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Loan Term (months)</label>
                <input
                  type="number"
                  required
                  value={formData.loanInfo.term}
                  onChange={(e) => handleChange('loanInfo', 'term', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Collateral Type </label>
                <input
                  type="text"
                  required
                  value={formData.loanInfo.collateralType}
                  onChange={(e) => handleChange('loanInfo', 'collateralType', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Collateral Value (₦)</label>
                <input
                  type="number"
                  required
                  value={formData.loanInfo.collateralValue}
                  onChange={(e) => handleChange('loanInfo', 'collateralValue', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Outstanding loan with other organization</label>
                <input
                  type="text"
                  required
                  placeholder='Specify Properly'
                  value={formData.loanInfo.outstandingLoans}
                  onChange={(e) => handleChange('loanInfo', 'outstandingLoans', e.target.value)}
                />
              </div>
            </div>
          </section>

          <button type="submit" className="submit-button" disabled={submitStatus === 'sending'}>
            {submitStatus === 'sending' ? 'Submitting...' : 'Submit Application'}
          </button>
          
          {submitStatus === 'success' && (
            <div className="success-message">
              Application submitted successfully! We'll respond with the full form within 24 hours.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="error-message">
              Failed to submit application. Please try again or contact us directly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Apply;
