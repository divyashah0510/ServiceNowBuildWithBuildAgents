import React from 'react';
import './InventoryItem.css';

export default function InventoryItem({ item, onEdit, onDelete }) {
  // Extract primitive values from ServiceNow fields
  const itemName = typeof item.item_name === 'object' 
    ? item.item_name.display_value || item.item_name.value 
    : item.item_name || 'Unnamed Item';

  const description = typeof item.item_description === 'object' 
    ? item.item_description.display_value || item.item_description.value 
    : item.item_description || '';

  const category = typeof item.category === 'object' 
    ? item.category.display_value || item.category.value 
    : item.category || 'Uncategorized';

  const quantity = typeof item.quantity === 'object' 
    ? item.quantity.display_value || item.quantity.value 
    : item.quantity || '0';

  const minQuantity = typeof item.min_quantity === 'object' 
    ? item.min_quantity.display_value || item.min_quantity.value 
    : item.min_quantity || '0';

  const maxQuantity = typeof item.max_quantity === 'object' 
    ? item.max_quantity.display_value || item.max_quantity.value 
    : item.max_quantity || '0';

  const location = typeof item.location === 'object' 
    ? item.location.display_value || item.location.value 
    : item.location || '';

  const assignedTo = typeof item.assigned_to === 'object' 
    ? item.assigned_to.display_value 
    : item.assigned_to || '';

  const unitCost = typeof item.unit_cost === 'object' 
    ? item.unit_cost.display_value || item.unit_cost.value 
    : item.unit_cost || '';

  const active = typeof item.active === 'object' 
    ? item.active.display_value || item.active.value 
    : item.active || 'true';

  const notes = typeof item.notes === 'object' 
    ? item.notes.display_value || item.notes.value 
    : item.notes || '';

  const purchaseDate = typeof item.purchase_date === 'object' 
    ? item.purchase_date.display_value || item.purchase_date.value 
    : item.purchase_date || '';

  // Calculate status based on quantity levels
  const currentQty = parseInt(quantity) || 0;
  const minQty = parseInt(minQuantity) || 0;
  const maxQty = parseInt(maxQuantity) || 0;

  let stockStatus = 'normal';
  if (currentQty === 0) {
    stockStatus = 'out-of-stock';
  } else if (currentQty <= minQty) {
    stockStatus = 'low-stock';
  } else if (currentQty >= maxQty) {
    stockStatus = 'overstocked';
  }

  const getCategoryIcon = (cat) => {
    const icons = {
      'electronics': '💻',
      'office_supplies': '📎',
      'furniture': '🪑',
      'tools': '🔧',
      'consumables': '📦',
      'other': '📋'
    };
    return icons[cat] || '📋';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'out-of-stock': { text: 'Out of Stock', class: 'status-out' },
      'low-stock': { text: 'Low Stock', class: 'status-low' },
      'normal': { text: 'In Stock', class: 'status-normal' },
      'overstocked': { text: 'Overstocked', class: 'status-over' }
    };
    return badges[status] || badges.normal;
  };

  const statusBadge = getStatusBadge(stockStatus);

  return (
    <div className={`inventory-item ${active === 'false' ? 'inactive' : ''}`}>
      <div className="item-header">
        <div className="item-title">
          <span className="category-icon">{getCategoryIcon(category)}</span>
          <h3>{itemName}</h3>
        </div>
        <div className="item-actions">
          <button 
            className="btn-icon edit"
            onClick={() => onEdit(item)}
            title="Edit Item"
          >
            ✏️
          </button>
          <button 
            className="btn-icon delete"
            onClick={() => onDelete(item)}
            title="Delete Item"
          >
            🗑️
          </button>
        </div>
      </div>

      {description && (
        <p className="item-description">{description}</p>
      )}

      <div className="item-details">
        <div className="detail-row">
          <span className="label">Category:</span>
          <span className="value category-tag">{category.replace('_', ' ')}</span>
        </div>

        <div className="detail-row quantity-row">
          <span className="label">Quantity:</span>
          <div className="quantity-info">
            <span className="current-qty">{quantity}</span>
            <span className="qty-range">({minQty} - {maxQty})</span>
            <span className={`status-badge ${statusBadge.class}`}>
              {statusBadge.text}
            </span>
          </div>
        </div>

        {location && (
          <div className="detail-row">
            <span className="label">Location:</span>
            <span className="value">📍 {location}</span>
          </div>
        )}

        {assignedTo && (
          <div className="detail-row">
            <span className="label">Assigned to:</span>
            <span className="value">👤 {assignedTo}</span>
          </div>
        )}

        {unitCost && (
          <div className="detail-row">
            <span className="label">Unit Cost:</span>
            <span className="value">💰 {unitCost}</span>
          </div>
        )}

        {purchaseDate && (
          <div className="detail-row">
            <span className="label">Purchase Date:</span>
            <span className="value">📅 {purchaseDate}</span>
          </div>
        )}

        {notes && (
          <div className="detail-row notes-row">
            <span className="label">Notes:</span>
            <span className="value notes">{notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}