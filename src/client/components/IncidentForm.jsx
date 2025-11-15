import React, { useState } from 'react';
import { IncidentService } from '../services/IncidentService.js';
import './IncidentForm.css';

const URGENCY_OPTIONS = [
  { value: '3', label: 'Low' },
  { value: '2', label: 'Medium' },
  { value: '1', label: 'High' }
];

const CATEGORY_OPTIONS = [
  { value: 'hardware', label: 'Hardware' },
  { value: 'software', label: 'Software' },
  { value: 'network', label: 'Network' },
  { value: 'email', label: 'Email' },
  { value: 'access', label: 'Access/Password' },
  { value: 'printing', label: 'Printing' },
  { value: 'other', label: 'Other' }
];

export default function IncidentForm({ onIncidentCreated }) {
  const [formData, setFormData] = useState({
    short_description: '',
    description: '',
    urgency: '3',
    category: '',
    location: '',
    contact_phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const incidentService = new IncidentService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await incidentService.createIncident(formData);
      const incidentNumber = typeof result.number === 'object' ? 
        result.number.display_value : 
        result.number;
      
      onIncidentCreated(incidentNumber);
    } catch (err) {
      console.error('Failed to create incident:', err);
      setError('Failed to create incident. Please try again or contact IT support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="incident-form-container">
      <form onSubmit={handleSubmit} className="incident-form">
        {error && (
          <div className="error-alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="form-section">
          <h3>Issue Summary</h3>
          
          <div className="form-group">
            <label htmlFor="short_description" className="required">
              Brief Description of the Issue
            </label>
            <input
              type="text"
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              required
              maxLength="160"
              placeholder="e.g., Cannot access email, Computer won't start, etc."
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="required">
              Issue Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Please select a category</option>
              {CATEGORY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="urgency" className="required">
              Urgency
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
              className="form-select"
            >
              {URGENCY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <small className="form-help">
              High: Work stopped, Medium: Significant impact, Low: Minor inconvenience
            </small>
          </div>
        </div>

        <div className="form-section">
          <h3>Detailed Information</h3>
          
          <div className="form-group">
            <label htmlFor="description" className="required">
              Detailed Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Please provide detailed information about the issue, including:&#10;- What were you trying to do?&#10;- What happened instead?&#10;- Any error messages you saw&#10;- Steps you've already tried"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Your Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Building A, Floor 3, Room 301"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact_phone">
              Contact Phone Number
            </label>
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="e.g., (555) 123-4567"
              className="form-input"
            />
            <small className="form-help">
              Optional: In case we need to call you about this issue
            </small>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? 'Creating Incident...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}