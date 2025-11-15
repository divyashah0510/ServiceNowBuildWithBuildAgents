export class InventoryService {
  constructor() {
    this.tableName = "x_1599811_inventor_inventory_item";
  }

  async list(filters = {}) {
    try {
      const searchParams = new URLSearchParams(filters);
      searchParams.set('sysparm_display_value', 'all');
      searchParams.set('sysparm_limit', '1000');
      
      const response = await fetch(`/api/now/table/${this.tableName}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      throw error;
    }
  }

  async create(itemData) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating inventory item:', error);
      throw error;
    }
  }

  async update(sysId, itemData) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating inventory item:', error);
      throw error;
    }
  }

  async delete(sysId) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      throw error;
    }
  }

  async getById(sysId) {
    try {
      const searchParams = new URLSearchParams({
        sysparm_display_value: 'all'
      });

      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching inventory item:', error);
      throw error;
    }
  }
}