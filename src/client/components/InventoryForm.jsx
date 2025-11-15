import React, { useState, useEffect } from 'react';
import './InventoryForm.css';

export default function InventoryForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    item_name: '',
    item_description: '',
    category: '',
    quantity: '0',
    min_quantity: '0',
    max_quantity: '100',
    location: '',
    unit_cost: '',
    purchase_date: '',
    notes: '',
    active: 'true'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      // Extract values from ServiceNow field objects
      setFormData({
        item_name: typeof item.item_name === 'object' 
          ? item.item_name.display_value || item.item_name.value || ''
          : item.item_name || '',
        item_description: typeof item.item_description === 'object' 
          ? item.item_description.display_value || item.item_description.value || ''
          : item.item_description || '',
        category: typeof item.category === 'object' 
          ? item.category.value || item.category.display_value || ''
          : item.category || '',
        quantity: typeof item.quantity === 'object' 
          ? item.quantity.display_value || item.quantity.value || '0'
          : item.quantity || '0',
        min_quantity: typeof item.min_quantity === 'object' 
          ? item.min_quantity.display_value || item.min_quantity.value || '0'
          : item.min_quantity || '0',
        max_quantity: typeof item.max_quantity === 'object' 
          ? item.max_quantity.display_value || item.max_quantity.value || '100'
          : item.max_quantity || '100',
        location: typeof item.location === 'object' 
          ? item.location.display_value || item.location.value || ''
          : item.location || '',
        unit_cost: typeof item.unit_cost === 'object' 
          ? item.unit_cost.display_value || item.unit_cost.value || ''
          : item.unit_cost || '',
        purchase_date: typeof item.purchase_date === 'object' 
          ? item.purchase_date.display_value || item.purchase_date.value || ''
          : item.purchase_date || '',
        notes: typeof item.notes === 'object' 
          ? item.notes.display_value || item.notes.value || ''
          : item.notes || '',
        active: typeof item.active === 'object' 
          ? item.active.display_value || item.active.value || 'true'
          : item.active || 'true'
      });
    }
  }, [item]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.item_name.trim()) {
      newErrors.item_name = 'Item name is required';
    }

    const qty = parseInt(formData.quantity);
    const minQty = parseInt(formData.min_quantity);
    const maxQty = parseInt(formData.max_quantity);

    if (isNaN(qty) || qty < 0) {
      newErrors.quantity = 'Quantity must be a non-negative number';
    }

    if (isNaN(minQty) || minQty < 0) {
      newErrors.min_quantity = 'Minimum quantity must be a non-negative number';
    }

    if (isNaN(maxQty) || maxQty < 0) {
      newErrors.max_quantity = 'Maximum quantity must be a non-negative number';
    }

    if (!isNaN(minQty) && !isNaN(maxQty) && minQty > maxQty) {
      newErrors.min_quantity = 'Minimum quantity cannot be greater than maximum quantity';
    }

    if (formData.purchase_date && !/^\d{4}-\d{2}-\d{2}$/.test(formData.purchase_date)) {
      newErrors.purchase_date = 'Purchase date must be in YYYY-MM-DD format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2>{item ? 'Edit Inventory Item' : 'Add New Inventory Item'}</h2>
          <button className="close-btn" onClick={onCancel}>✖</button>
        </div>

        <form onSubmit={handleSubmit} className="inventory-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="item_name">Item Name *</label>
              <input
                type="text"
                id="item_name"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                className={errors.item_name ? 'error' : ''}
                placeholder="Enter item name"
                maxLength="100"
                required
              />
              {errors.item_name && <span className="error-text">{errors.item_name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="office_supplies">Office Supplies</option>
                <option value="furniture">Furniture</option>
                <option value="tools">Tools</option>
                <option value="consumables">Consumables</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="item_description">Description</label>
              <textarea
                id="item_description"
                name="item_description"
                value={formData.item_description}
                onChange={handleChange}
                placeholder="Enter item description"
                maxLength="255"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Current Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={errors.quantity ? 'error' : ''}
                min="0"
                required
              />
              {errors.quantity && <span className="error-text">{errors.quantity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="min_quantity">Minimum Quantity</label>
              <input
                type="number"
                id="min_quantity"
                name="min_quantity"
                value={formData.min_quantity}
                onChange={handleChange}
                className={errors.min_quantity ? 'error' : ''}
                min="0"
              />
              {errors.min_quantity && <span className="error-text">{errors.min_quantity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="max_quantity">Maximum Quantity</label>
              <input
                type="number"
                id="max_quantity"
                name="max_quantity"
                value={formData.max_quantity}
                onChange={handleChange}
                className={errors.max_quantity ? 'error' : ''}
                min="0"
              />
              {errors.max_quantity && <span className="error-text">{errors.max_quantity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Warehouse A, Floor 2"
                maxLength="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="unit_cost">Unit Cost</label>
              <input
                type="text"
                id="unit_cost"
                name="unit_cost"
                value={formData.unit_cost}
                onChange={handleChange}
                placeholder="e.g., $25.99"
                maxLength="20"
              />
            </div>

            <div className="form-group">
              <label htmlFor="purchase_date">Purchase Date</label>
              <input
                type="date"
                id="purchase_date"
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                className={errors.purchase_date ? 'error' : ''}
              />
              {errors.purchase_date && <span className="error-text">{errors.purchase_date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="active">Status</label>
              <select
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes about this item"
                maxLength="1000"
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (item ? 'Update Item' : 'Add Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}