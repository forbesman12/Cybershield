import React, { useState, useCallback, useEffect } from 'react';
import { paymentApi, authUtils, formatFileSize, getFileTypeIcon, VERIFICATION_STATUS } from '../../services/paymentApi';
import './PaymentProofUpload.css';

const PaymentProofUpload = ({ bookingData, onUploadSuccess, onClose }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const [statusMessage, setStatusMessage] = useState('');
  const [proofStatus, setProofStatus] = useState(null);
  const [formData, setFormData] = useState({
    totalAmount: bookingData?.totalAmount || '',
    guestName: bookingData?.guestName || `${bookingData?.name || ''} ${bookingData?.surname || ''}`.trim(),
    guestEmail: bookingData?.email || ''
  });

  // Check existing proof status on component mount
  useEffect(() => {
    if (bookingData?.id) {
      checkProofStatus();
    }
  }, [bookingData?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkProofStatus = async () => {
    if (!authUtils.isAuthenticated()) return;
    
    try {
      const response = await paymentApi.getPaymentProofStatus(bookingData.id);
      setProofStatus(response.data);
    } catch {
      // Silently handle - user might not have uploaded proof yet  
      console.log('No existing proof found');
    }
  };

  const handleFileSelect = useCallback((event) => {
    const selectedFile = event.target.files[0];
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Client-side validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];

    if (selectedFile.size > maxSize) {
      setUploadStatus('error');
      setStatusMessage('File size must be less than 5MB');
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      setUploadStatus('error');
      setStatusMessage('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      return;
    }

    setFile(selectedFile);
    setUploadStatus(null);
    setStatusMessage('');
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!file) {
      throw new Error('Please select a payment proof file');
    }

    if (!formData.totalAmount || parseFloat(formData.totalAmount) <= 0) {
      throw new Error('Please enter a valid payment amount');
    }

    if (!formData.guestName.trim()) {
      throw new Error('Guest name is required');
    }

    if (!formData.guestEmail.trim()) {
      throw new Error('Guest email is required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.guestEmail)) {
      throw new Error('Please enter a valid email address');
    }
  };

  const handleUpload = async () => {
    try {
      validateForm();
      setIsUploading(true);
      setUploadProgress(0);
      setUploadStatus(null);
      setStatusMessage('');

      // Ensure user is authenticated (generate guest token if needed)
      if (!authUtils.isAuthenticated()) {
        authUtils.generateGuestToken(formData.guestEmail, bookingData.id);
      }

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const proofData = {
        file,
        totalAmount: parseFloat(formData.totalAmount),
        guestName: formData.guestName.trim(),
        guestEmail: formData.guestEmail.trim()
      };

      const response = await paymentApi.uploadPaymentProof(bookingData.id, proofData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploadStatus('success');
        setStatusMessage('Payment proof uploaded successfully! Our team will review it within 24-48 hours.');
        setProofStatus(response.data);
        
        if (onUploadSuccess) {
          onUploadSuccess(response.data);
        }
      }, 500);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setStatusMessage(error.message);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      // Create a synthetic event object
      const syntheticEvent = {
        target: { files: [droppedFile] }
      };
      handleFileSelect(syntheticEvent);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case VERIFICATION_STATUS.PENDING: return '#f59e0b';
      case VERIFICATION_STATUS.VERIFIED: return '#10b981';
      case VERIFICATION_STATUS.REJECTED: return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case VERIFICATION_STATUS.PENDING: return 'Under Review';
      case VERIFICATION_STATUS.VERIFIED: return 'Verified';
      case VERIFICATION_STATUS.REJECTED: return 'Rejected';
      default: return 'Unknown';
    }
  };

  // If proof already exists, show status
  if (proofStatus && !file) {
    return (
      <div className="payment-proof-upload">
        <div className="proof-status-container">
          <div className="proof-status-header">
            <h3>Payment Proof Status</h3>
            <button onClick={onClose} className="close-button">×</button>
          </div>
          
          <div className="proof-status-info">
            <div className="status-badge" style={{ backgroundColor: getStatusColor(proofStatus.verificationStatus) }}>
              {getStatusText(proofStatus.verificationStatus)}
            </div>
            
            <div className="proof-details">
              <p><strong>Uploaded:</strong> {new Date(proofStatus.uploadedAt).toLocaleDateString()}</p>
              <p><strong>File Type:</strong> {getFileTypeIcon(proofStatus.fileType)} {proofStatus.fileType}</p>
              <p><strong>File Size:</strong> {formatFileSize(proofStatus.fileSize)}</p>
            </div>
            
            {proofStatus.verificationStatus === VERIFICATION_STATUS.PENDING && (
              <div className="status-message info">
                <p>Your payment proof is being reviewed. You'll receive an email confirmation once verified.</p>
              </div>
            )}
            
            {proofStatus.verificationStatus === VERIFICATION_STATUS.VERIFIED && (
              <div className="status-message success">
                <p>✅ Your payment has been verified! Your booking is confirmed.</p>
              </div>
            )}
            
            {proofStatus.verificationStatus === VERIFICATION_STATUS.REJECTED && (
              <div className="status-message error">
                <p>❌ Your payment proof was rejected. Please upload a clearer image or contact support.</p>
                <button 
                  onClick={() => setProofStatus(null)} 
                  className="upload-new-button"
                >
                  Upload New Proof
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-proof-upload">
      <div className="upload-container">
        <div className="upload-header">
          <h3>Upload Payment Proof</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="upload-instructions">
          <p>Please upload your payment receipt or bank transfer confirmation.</p>
          <p><strong>Accepted formats:</strong> JPEG, PNG, GIF, PDF (max 5MB)</p>
        </div>

        {/* File Upload Area */}
        <div 
          className={`file-upload-area ${file ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="file-selected">
              <div className="file-info">
                <span className="file-icon">{getFileTypeIcon(file.type)}</span>
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatFileSize(file.size)}</span>
                </div>
              </div>
              <button 
                onClick={() => setFile(null)} 
                className="remove-file-button"
                disabled={isUploading}
              >
                ×
              </button>
            </div>
          ) : (
            <div className="upload-prompt">
              <div className="upload-icon">📁</div>
              <p>Drag and drop your file here, or</p>
              <label className="file-select-button">
                Choose File
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,application/pdf"
                  onChange={handleFileSelect}
                  hidden
                />
              </label>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount Paid *</label>
            <input
              type="number"
              id="totalAmount"
              value={formData.totalAmount}
              onChange={(e) => handleInputChange('totalAmount', e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              disabled={isUploading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="guestName">Guest Name *</label>
            <input
              type="text"
              id="guestName"
              value={formData.guestName}
              onChange={(e) => handleInputChange('guestName', e.target.value)}
              placeholder="Full name as on booking"
              disabled={isUploading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="guestEmail">Guest Email *</label>
            <input
              type="email"
              id="guestEmail"
              value={formData.guestEmail}
              onChange={(e) => handleInputChange('guestEmail', e.target.value)}
              placeholder="Email used for booking"
              disabled={isUploading}
              required
            />
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="progress-text">Uploading... {uploadProgress}%</span>
          </div>
        )}

        {/* Status Messages */}
        {uploadStatus && (
          <div className={`status-message ${uploadStatus}`}>
            <p>{statusMessage}</p>
          </div>
        )}

        {/* Actions */}
        <div className="upload-actions">
          <button 
            onClick={onClose} 
            className="cancel-button"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload} 
            className="upload-button"
            disabled={!file || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Proof'}
          </button>
        </div>

        {/* Security Notice */}
        <div className="security-notice">
          <p><strong>🔒 Secure Upload:</strong> Your files are encrypted and stored securely. Only authorized hotel staff can access your payment proof.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentProofUpload;
