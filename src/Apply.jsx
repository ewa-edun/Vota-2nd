import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Apply.css';

const Apply = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      age: '',
      phone: '',
      email: '',
      address: ''
    },
    employmentInfo: {
      occupation: '',
      employer: '',
      monthlySalary: '',
      yearsEmployed: ''
    },
    loanInfo: {
      amount: '',
      purpose: '',
      term: '',
      collateralType: '',
      collateralValue: ''
    },
    guarantorInfo: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      occupation: ''
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

    // Format the data for email
    const emailParams = {
      to_email: 'talk2vota@gmail.com',
      from_name: formData.personalInfo.name,
      from_email: formData.personalInfo.email,
      message: `
        Personal Information:
        Name: ${formData.personalInfo.name}
        Age: ${formData.personalInfo.age}
        Phone: ${formData.personalInfo.phone}
        Email: ${formData.personalInfo.email}
        Address: ${formData.personalInfo.address}

        Employment Information:
        Occupation: ${formData.employmentInfo.occupation}
        Employer: ${formData.employmentInfo.employer}
        Monthly Salary: ${formData.employmentInfo.monthlySalary}
        Years Employed: ${formData.employmentInfo.yearsEmployed}

        Loan Information:
        Amount: ${formData.loanInfo.amount}
        Purpose: ${formData.loanInfo.purpose}
        Term: ${formData.loanInfo.term}
        Collateral Type: ${formData.loanInfo.collateralType}
        Collateral Value: ${formData.loanInfo.collateralValue}

        Guarantor Information:
        Name: ${formData.guarantorInfo.name}
        Relationship: ${formData.guarantorInfo.relationship}
        Phone: ${formData.guarantorInfo.phone}
        Email: ${formData.guarantorInfo.email}
        Address: ${formData.guarantorInfo.address}
        Occupation: ${formData.guarantorInfo.occupation}
      `
    };

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // You'll need to replace these with your EmailJS credentials
        'YOUR_TEMPLATE_ID',
        emailParams,
        'YOUR_PUBLIC_KEY'
      );
      setSubmitStatus('success');
      // Reset form
      setFormData({
        personalInfo: { name: '', age: '', phone: '', email: '', address: '' },
        employmentInfo: { occupation: '', employer: '', monthlySalary: '', yearsEmployed: '' },
        loanInfo: { amount: '', purpose: '', term: '', collateralType: '', collateralValue: '' },
        guarantorInfo: { name: '', relationship: '', phone: '', email: '', address: '', occupation: '' }
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
        <h1>Loan Application</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <section className="form-section">
            <h2>Personal Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.name}
                  onChange={(e) => handleChange('personalInfo', 'name', e.target.value)}
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
                  required
                  value={formData.personalInfo.email}
                  onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.address}
                  onChange={(e) => handleChange('personalInfo', 'address', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Employment Information */}
          <section className="form-section">
            <h2>Employment Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  required
                  value={formData.employmentInfo.occupation}
                  onChange={(e) => handleChange('employmentInfo', 'occupation', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Employer</label>
                <input
                  type="text"
                  required
                  value={formData.employmentInfo.employer}
                  onChange={(e) => handleChange('employmentInfo', 'employer', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Monthly Salary</label>
                <input
                  type="number"
                  required
                  value={formData.employmentInfo.monthlySalary}
                  onChange={(e) => handleChange('employmentInfo', 'monthlySalary', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Years Employed</label>
                <input
                  type="number"
                  required
                  value={formData.employmentInfo.yearsEmployed}
                  onChange={(e) => handleChange('employmentInfo', 'yearsEmployed', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Loan Information */}
          <section className="form-section">
            <h2>Loan Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Loan Amount</label>
                <input
                  type="number"
                  required
                  value={formData.loanInfo.amount}
                  onChange={(e) => handleChange('loanInfo', 'amount', e.target.value)}
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
                <select
                  required
                  value={formData.loanInfo.term}
                  onChange={(e) => handleChange('loanInfo', 'term', e.target.value)}
                >
                  <option value="">Select Term</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                </select>
              </div>
              <div className="form-group">
                <label>Collateral Type</label>
                <input
                  type="text"
                  required
                  value={formData.loanInfo.collateralType}
                  onChange={(e) => handleChange('loanInfo', 'collateralType', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Collateral Value</label>
                <input
                  type="number"
                  required
                  value={formData.loanInfo.collateralValue}
                  onChange={(e) => handleChange('loanInfo', 'collateralValue', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Guarantor Information */}
          <section className="form-section">
            <h2>Guarantor Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Guarantor Name</label>
                <input
                  type="text"
                  required
                  value={formData.guarantorInfo.name}
                  onChange={(e) => handleChange('guarantorInfo', 'name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Relationship</label>
                <input
                  type="text"
                  required
                  value={formData.guarantorInfo.relationship}
                  onChange={(e) => handleChange('guarantorInfo', 'relationship', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.guarantorInfo.phone}
                  onChange={(e) => handleChange('guarantorInfo', 'phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={formData.guarantorInfo.email}
                  onChange={(e) => handleChange('guarantorInfo', 'email', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <input
                  type="text"
                  required
                  value={formData.guarantorInfo.address}
                  onChange={(e) => handleChange('guarantorInfo', 'address', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  required
                  value={formData.guarantorInfo.occupation}
                  onChange={(e) => handleChange('guarantorInfo', 'occupation', e.target.value)}
                />
              </div>
            </div>
          </section>

          <button type="submit" className="submit-button" disabled={submitStatus === 'sending'}>
            {submitStatus === 'sending' ? 'Submitting...' : 'Submit Application'}
          </button>
          
          {submitStatus === 'success' && (
            <div className="success-message">
              Application submitted successfully! We'll contact you soon.
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
