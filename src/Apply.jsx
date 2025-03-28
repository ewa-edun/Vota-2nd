import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Apply.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

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
    employmentInfo: {
      occupation: '',
      employer: '',
      monthlySalary: '',
      yearsEmployed: '',
      bvn: '',
      officePhone: '',
      officeAddress: '',
      source: '',
      years: '',
      othermonthlySalary: ''
    },
    loanInfo: {
      amount: '',
      amountInWords: '',
      purpose: '',
      term: '',
      monthlyRepayment: '',
      accountNumber: '',
      bankName: '',
      collateralType: '',
      collateralValue: '',
      outstandingLoans: ''
    },
    guarantorInfo: {
      fullName: '',
      relationship: '',
      phone: '',
      email: '',
      maritalStatus: '',
      numberOfChildren: '',
      homeAddress: '',
      occupation: '',
      monthlySalary: '',
      yearsEmployed: '',
      officeAddress: '',
      source: '',
      years: '',
      othermonthlySalary: ''
    }
  });

  const [submitStatus, setSubmitStatus] = useState('');
  const [files, setFiles] = useState({
    applicantBankStatements: [],
    applicantId: null,
    guarantorBankStatements: [],
    guarantorId: null,
    applicantSignature: null,
    guarantorSignature: null
  });
  const [fileNames, setFileNames] = useState({
    applicantBankStatements: [],
    applicantId: '',
    guarantorBankStatements: [],
    guarantorId: '',
    applicantSignature: '',
    guarantorSignature: ''
  });

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (type, e) => {
    const uploadedFiles = e.target.files;
    
    if (type.includes('BankStatements')) {
      setFiles(prev => ({
        ...prev,
        [type]: Array.from(uploadedFiles)
      }));
      setFileNames(prev => ({
        ...prev,
        [type]: Array.from(uploadedFiles).map(file => file.name)
      }));
    } else {
      setFiles(prev => ({
        ...prev,
        [type]: uploadedFiles[0]
      }));
      setFileNames(prev => ({
        ...prev,
        [type]: uploadedFiles[0]?.name || ''
      }));
    }
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

        Employment Information:
        Occupation: ${formData.employmentInfo.occupation}
        Employer: ${formData.employmentInfo.employer}
        Monthly Salary: ₦${formData.employmentInfo.monthlySalary}
        Years Employed: ${formData.employmentInfo.yearsEmployed}
        BVN: ${formData.employmentInfo.bvn}
        Office Phone: ${formData.employmentInfo.officePhone}
        Office Address: ${formData.employmentInfo.officeAddress}
        Source: ${formData.employmentInfo.source}
        Years at Source: ${formData.employmentInfo.years}
        Monthly Income: ₦${formData.employmentInfo.othermonthlySalary}

        Loan Information:
        Amount: ₦${formData.loanInfo.amount}
        Amount in Words: ${formData.loanInfo.amountInWords}
        Purpose: ${formData.loanInfo.purpose}
        Term: ${formData.loanInfo.term} months
        Monthly Repayment: ₦${formData.loanInfo.monthlyRepayment}
        Account Number: ${formData.loanInfo.accountNumber}
        Bank Name: ${formData.loanInfo.bankName}
        Collateral Type: ${formData.loanInfo.collateralType}
        Collateral Value: ₦${formData.loanInfo.collateralValue}
        Outstanding Loans: ${formData.loanInfo.outstandingLoans}

        Guarantor Information:
        Full Name: ${formData.guarantorInfo.fullName}
        Relationship: ${formData.guarantorInfo.relationship}
        Phone: ${formData.guarantorInfo.phone}
        Email: ${formData.guarantorInfo.email}
        Marital Status: ${formData.guarantorInfo.maritalStatus}
        Number of Children: ${formData.guarantorInfo.numberOfChildren}
        Home Address: ${formData.guarantorInfo.homeAddress}
        Occupation: ${formData.guarantorInfo.occupation}
        Monthly Salary: ₦${formData.guarantorInfo.monthlySalary}
        Years Employed: ${formData.guarantorInfo.yearsEmployed}
        Office Address: ${formData.guarantorInfo.officeAddress}
        Source: ${formData.guarantorInfo.source}
        Years at Source: ${formData.guarantorInfo.years}
        Monthly Income: ₦${formData.guarantorInfo.othermonthlySalary}

        Uploaded Documents:
        Applicant Bank Statements: ${fileNames.applicantBankStatements.join(', ')}
        Applicant ID: ${fileNames.applicantId}
        Guarantor Bank Statements: ${fileNames.guarantorBankStatements.join(', ')}
        Guarantor ID: ${fileNames.guarantorId}
        Signatures: 
        - Applicant: ${fileNames.applicantSignature}
        - Guarantor: ${fileNames.guarantorSignature}
      `
    };

    try {
      await emailjs.send(
        'default_service',
        'template_dhdtzlo',
        emailParams,
        'YXoZm3iH-rpbriSEF'
      );
      setSubmitStatus('success');
      setFiles({
        applicantBankStatements: [],
        applicantId: null,
        guarantorBankStatements: [],
        guarantorId: null,
        applicantSignature: null,
        guarantorSignature: null
      });
      setFileNames({
        applicantBankStatements: [],
        applicantId: '',
        guarantorBankStatements: [],
        guarantorId: '',
        applicantSignature: '',
        guarantorSignature: ''
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
          <li>Duly completed 1 guarantor's form.</li>
          <li>Bank Statement for the last 4 months.</li>
          <li>Photocopy of valid Guarantor's Identity card (Duly signed).</li>
          <li>Photocopy of a valid applicant's employer identity card.</li>
          <li>Post-dated cheque for the repayment of principal and other accrued interest written in favor of Vota Investment Ltd.</li>
          <li>Interest Rate: 5%</li>
          <li>All expenses incurred by VOTA INVESTMENT LTD. for legal, perfection, and recovery in case of default that may arise from this loan shall be borne by the applicant.</li>
          <li>Advance payment of administrative fee (₦2,000) or 1% of principal, whichever is greater.</li>
          <li>We do not encourage cash transactions and we do not encourage rollovers.</li>
          <li>Please be informed that where you do not want your cheque to be presented, kindly make an equivalent of cash available 24 hours prior to the due date of presenting your cheque.</li>
          <li>A returned cheque shall attract a fine of ₦2,500 only.</li> <br></br>
        </ul>
        <h3>If the above conditions are acceptable to you, the applicant, kindly scan your signature below before submitting.</h3>
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
                <label>Monthly Salary (₦)</label>
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
              <div className="form-group">
                <label>Bank Verification Number (BVN)</label>
                <input
                  type="number"
                  required
                  value={formData.employmentInfo.bvn}
                  onChange={(e) => handleChange('employmentInfo', 'bvn', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Office Phone Number (if applicable)</label>
                <input
                  type="tel"
                  value={formData.employmentInfo.officePhone}
                  onChange={(e) => handleChange('employmentInfo', 'officePhone', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Office Address</label>
                <input
                  type="text"
                  required
                  value={formData.employmentInfo.officeAddress}
                  onChange={(e) => handleChange('employmentInfo', 'officeAddress', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Other Sources of Income</label>
                <input
                  type="text"
                  value={formData.employmentInfo.source}
                  onChange={(e) => handleChange('employmentInfo', 'source', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Years at other source</label>
                <input
                  type="number"
                  value={formData.employmentInfo.years}
                  onChange={(e) => handleChange('employmentInfo','years', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Monthly Salary from other source(₦)</label>
                <input
                  type="number"
                  value={formData.employmentInfo.othermonthlySalary}
                  onChange={(e) => handleChange('employmentInfo', 'othermonthlySalary', e.target.value)}
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
                <label>Monthly repayment amount (₦)</label>
                <input
                  type="number"
                  required
                  value={formData.loanInfo.monthlyRepayment}
                  onChange={(e) => handleChange('loanInfo', 'monthlyRepayment', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="number"
                  required
                  value={formData.loanInfo.accountNumber}
                  onChange={(e) => handleChange('loanInfo', 'accountNumber', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  required
                  value={formData.loanInfo.bankName}
                  onChange={(e) => handleChange('loanInfo', 'bankName', e.target.value)}
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

          {/* Guarantor Information */}
          <section className="form-section">
            <h2>Guarantor Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Guarantor Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.guarantorInfo.fullName}
                  onChange={(e) => handleChange('guarantorInfo', 'fullName', e.target.value)}
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
              <div className="form-group">
                <label>Marital Status</label>
                <input
                  type="text"
                  required
                  value={formData.guarantorInfo.maritalStatus}
                  onChange={(e) => handleChange('guarantorInfo', 'maritalStatus', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Number of Children</label>
                <input
                  type="number"
                  required
                  value={formData.guarantorInfo.numberOfChildren}
                  onChange={(e) => handleChange('guarantorInfo', 'numberOfChildren', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Home Address</label>
                <input
                  type="text"
                  required
                  value={formData.guarantorInfo.homeAddress}
                  onChange={(e) => handleChange('guarantorInfo', 'homeAddress', e.target.value)}
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
              <div className="form-group">
                <label>Monthly Salary (₦)</label>
                <input
                  type="number"
                  required
                  value={formData.guarantorInfo.monthlySalary}
                  onChange={(e) => handleChange('guarantorInfo', 'monthlySalary', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Years Employed</label>
                <input
                  type="number"
                  required
                  value={formData.guarantorInfo.yearsEmployed}
                  onChange={(e) => handleChange('guarantorInfo', 'yearsEmployed', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Office Address</label>
                <input
                  type="text"
                  required
                  value={formData.guarantorInfo.officeAddress}
                  onChange={(e) => handleChange('guarantorInfo', 'officeAddress', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Other Sources of Income</label>
                <input
                  type="text"
                  value={formData.guarantorInfo.source}
                  onChange={(e) => handleChange('guarantorInfo', 'source', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Years at other source</label>
                <input
                  type="number"
                  value={formData.guarantorInfo.years}
                  onChange={(e) => handleChange('guarantorInfo', 'years', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Monthly Salary from other source(₦)</label>
                <input
                  type="number"
                  value={formData.guarantorInfo.othermonthlySalary}
                  onChange={(e) => handleChange('guarantorInfo', 'othermonthlySalary', e.target.value)}
                />
              </div>

              <div className="oath-text">
                <p>
                  I hereby declare me truthful. I, (Name), hereby guarantee the loan of ₦ (Amount) you have granted to Mr./Mrs./Miss (Borrower's Name) of (Borrower's Address).<br/><br/>
                  
                  I irrevocably and unconditionally agree that this guarantee, given under my signature and date below, shall become operational from the date stated and remain in force until the loan and accrued interest are fully repaid to VOTA INVESTMENT LTD by the borrower.<br/><br/>
                  
                  I irrevocably and unconditionally undertake to indemnify VOTA INVESTMENT LTD for any default in repayment by the borrower. I also agree to personally repay the debt/loan and the accrued interest in the event of default.<br/><br/>
                  
                  In case of default by the borrower, I agree that I shall be bound by any legal or other lawful actions taken by VOTA INVESTMENT LTD to recover any outstanding balance of the loan granted under my guarantee.<br/><br/>
                  
                  Please find attached a photocopy of my I.D. card with my written signature and date on it.
                </p>
              </div>
            </div>
          </section>

          <div className="documents-section">
            <h2>Required Documents</h2>
            <div className="documents-grid">
              {/* Applicant's Bank Statements */}
              <div className="document-upload">
                <label>
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                  <h3>Your Bank Statements</h3>
                  <p>Upload last 3 months statements</p>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={(e) => handleFileUpload('applicantBankStatements', e)}
                  />
                  {fileNames.applicantBankStatements.length > 0 && (
                    <div className="file-name">
                      Selected files: {fileNames.applicantBankStatements.join(', ')}
                    </div>
                  )}
                </label>
              </div>

              {/* Applicant's ID */}
              <div className="document-upload">
                <label>
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                  <h3>Your ID Card</h3>
                  <p>Upload valid government ID</p>
                  <input 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('applicantId', e)}
                  />
                  {fileNames.applicantId && (
                    <div className="file-name">
                      Selected: {fileNames.applicantId}
                    </div>
                  )}
                </label>
              </div>

              {/* Guarantor's Bank Statements */}
              <div className="document-upload">
                <label>
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                  <h3>Guarantor's Bank Statements</h3>
                  <p>Upload last 3 months statements</p>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={(e) => handleFileUpload('guarantorBankStatements', e)}
                  />
                  {fileNames.guarantorBankStatements.length > 0 && (
                    <div className="file-name">
                      Selected files: {fileNames.guarantorBankStatements.join(', ')}
                    </div>
                  )}
                </label>
              </div>

              {/* Guarantor's ID */}
              <div className="document-upload">
                <label>
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                  <h3>Guarantor's ID Card</h3>
                  <p>Upload valid government ID</p>
                  <input 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('guarantorId', e)}
                  />
                  {fileNames.guarantorId && (
                    <div className="file-name">
                      Selected: {fileNames.guarantorId}
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Signatures Section */}
            <div style={{ marginTop: '2rem' }}>
              <h3>Signatures</h3>
              <div className="documents-grid">
                <div className="document-upload">
                  <label>
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                    <h3>Your Signature</h3>
                    <p>Upload scanned signature</p>
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('applicantSignature', e)}
                    />
                    {fileNames.applicantSignature && (
                      <div className="file-name">
                        Selected: {fileNames.applicantSignature}
                      </div>
                    )}
                  </label>
                </div>

                <div className="document-upload">
                  <label>
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                    <h3>Guarantor's Signature</h3>
                    <p>Upload scanned signature</p>
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('guarantorSignature', e)}
                    />
                    {fileNames.guarantorSignature && (
                      <div className="file-name">
                        Selected: {fileNames.guarantorSignature}
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

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
