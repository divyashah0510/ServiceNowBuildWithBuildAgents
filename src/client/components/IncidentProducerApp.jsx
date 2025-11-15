import React, { useState } from 'react';
import IncidentForm from './IncidentForm.jsx';
import './IncidentProducerApp.css';

export default function IncidentProducerApp() {
  const [submitted, setSubmitted] = useState(false);
  const [incidentNumber, setIncidentNumber] = useState('');

  const handleIncidentCreated = (number) => {
    setIncidentNumber(number);
    setSubmitted(true);
  };

  const handleCreateAnother = () => {
    setSubmitted(false);
    setIncidentNumber('');
  };

  return (
    <div className="incident-producer-app">
      <div className="header">
        <h1>Report a Technical Issue</h1>
        <p>Use this form to report technical problems and get help from our IT support team.</p>
      </div>

      {!submitted ? (
        <IncidentForm onIncidentCreated={handleIncidentCreated} />
      ) : (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Technical Issue Reported Successfully</h2>
          <p>Your incident has been created with number: <strong>{incidentNumber}</strong></p>
          <p>You will receive email updates about the progress of your request.</p>
          <button 
            className="create-another-btn"
            onClick={handleCreateAnother}
          >
            Report Another Issue
          </button>
        </div>
      )}
    </div>
  );
}