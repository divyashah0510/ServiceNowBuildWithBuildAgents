import React, { useEffect, useState, useMemo } from 'react';
import { InventoryService } from './services/InventoryService.js';
import InventoryList from './components/InventoryList.jsx';
import InventoryForm from './components/InventoryForm.jsx';
import './app.css';

export default function App() {
  const service = useMemo(() => new InventoryService(), []);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.list();
      setItems(result);
    } catch (err) {
      setError('Failed to load inventory items: ' + err.message);
      console.error('Error loading items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFormSubmit = async (itemData) => {
    try {
      if (editingItem) {
        const sysId = typeof editingItem.sys_id === 'object' 
          ? editingItem.sys_id.value 
          : editingItem.sys_id;
        await service.update(sysId, itemData);
      } else {
        await service.create(itemData);
      }
      await loadItems();
      handleFormClose();
    } catch (err) {
      setError('Failed to save item: ' + err.message);
      console.error('Error saving item:', err);
    }
  };

  const handleDeleteItem = async (item) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const sysId = typeof item.sys_id === 'object' 
        ? item.sys_id.value 
        : item.sys_id;
      await service.delete(sysId);
      await loadItems();
    } catch (err) {
      setError('Failed to delete item: ' + err.message);
      console.error('Error deleting item:', err);
    }
  };

  const filteredItems = items.filter(item => {
    const itemName = typeof item.item_name === 'object' 
      ? item.item_name.display_value || item.item_name.value 
      : item.item_name || '';
    
    const itemCategory = typeof item.category === 'object' 
      ? item.category.display_value || item.category.value 
      : item.category || '';

    const matchesSearch = itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || itemCategory === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="inventory-app">
        <div className="loading">Loading inventory...</div>
      </div>
    );
  }

  return (
    <div className="inventory-app">
      <header className="app-header">
        <h1>📦 Inventory Tracker</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={handleAddItem}
          >
            ➕ Add Item
          </button>
        </div>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>✖</button>
        </div>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-filter"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="office_supplies">Office Supplies</option>
          <option value="furniture">Furniture</option>
          <option value="tools">Tools</option>
          <option value="consumables">Consumables</option>
          <option value="other">Other</option>
        </select>
      </div>

      <InventoryList 
        items={filteredItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />

      {showForm && (
        <InventoryForm
          item={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
    </div>
  );
}