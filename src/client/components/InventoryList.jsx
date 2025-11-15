import React from 'react';
import InventoryItem from './InventoryItem.jsx';
import './InventoryList.css';

export default function InventoryList({ items, onEdit, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div className="inventory-list-empty">
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No inventory items found</h3>
          <p>Get started by adding your first inventory item.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-list">
      <div className="list-header">
        <h2>Inventory Items ({items.length})</h2>
      </div>
      <div className="items-grid">
        {items.map(item => {
          const sysId = typeof item.sys_id === 'object' 
            ? item.sys_id.value 
            : item.sys_id;
          
          return (
            <InventoryItem
              key={sysId}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}