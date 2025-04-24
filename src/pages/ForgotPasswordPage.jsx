import React, { useState } from 'react';
import '../styles/ForgotPasswordPage.css';
import ResetPasswordForm from './ResetPasswordForm'; 

const ForgotPasswordPage = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleOTP = () => {
    if (phone.length === 10 && /^\d+$/.test(phone)) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('resetOtp', otp);
      setGeneratedOtp(otp);  
      setOtpSent(true); 
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        {!otpSent ? (
          <>
            <h2>Forgot Password</h2>
            <p>Enter your phone number to receive an OTP:</p>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button onClick={handleOTP}>Generate OTP</button>
          </>
        ) : (
          <ResetPasswordForm phone={phone} otp={generatedOtp} />
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
