import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const ResetPasswordForm = ({ phone, otp }) => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const alertShownRef = useRef(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (otp && phone && !alertShownRef.current) {
      alert(`OTP sent to ${phone}: ${otp}`);
      alertShownRef.current = true;
    }
  }, [otp, phone]);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpDigits];
      newOtp[index] = value;
      setOtpDigits(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otpDigits.join('');
    const storedOtp = localStorage.getItem('resetOtp');

    if (enteredOtp.length !== 6) {
      alert('Please enter the full 6-digit OTP');
    } else if (enteredOtp !== storedOtp) {
      alert('Invalid OTP');
    } else if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
    } else if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      localStorage.setItem('userEmail', 'poorna@gmail.com');
      localStorage.setItem('userPassword', newPassword);
      localStorage.removeItem('resetOtp');

      setLoading(true);
      setSuccessMessage('Password changed successfully. Redirecting...');

      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  };

  return (
    <div className="forgot-box">
      <h2>Reset Password</h2>
      <p>Enter the OTP sent to {phone}:</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        {otpDigits.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(idx, e.target.value)}
            ref={(el) => (inputsRef.current[idx] = el)}
            style={{
              width: '40px',
              height: '40px',
              textAlign: 'center',
              fontSize: '18px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
        ))}
      </div>

      {/* New Password Field */}
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <input
          type={showNewPassword ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '15px',
          }}
        />
        <span
          onClick={() => setShowNewPassword(!showNewPassword)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#6b7280',
          }}
        >
          {showNewPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      {/* Confirm Password Field */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '15px',
          }}
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#6b7280',
          }}
        >
          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          fontSize: '15px',
          fontWeight: '500',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>

      {successMessage && (
        <div style={{ marginTop: '15px', color: 'green' }}>
          {successMessage}
          {loading && (
            <div style={{ marginTop: '10px' }}>
              <div className="loader" />
            </div>
          )}
        </div>
      )}

      {/* Simple spinner */}
      <style>{`
        .loader {
          margin: 0 auto;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #2563eb;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ResetPasswordForm;
