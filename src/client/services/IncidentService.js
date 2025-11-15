export class IncidentService {
  constructor() {
    this.tableName = "incident";
  }

  async createIncident(data) {
    try {
      // Prepare incident data with required fields
      const incidentData = {
        short_description: data.short_description,
        description: data.description,
        urgency: data.urgency,
        impact: '2', // Medium impact by default
        state: '1', // New
        category: 'inquiry', // ServiceNow standard category for technical issues
        subcategory: data.category,
        location: data.location,
        contact_phone: data.contact_phone,
        opened_by: 'javascript:gs.getUserID()', // This will be resolved server-side
        caller_id: 'javascript:gs.getUserID()', // This will be resolved server-side
        assignment_group: '', // Will be set by business rule
        priority: this.calculatePriority(data.urgency, '2') // Calculate based on urgency and impact
      };

      const response = await fetch(`/api/now/table/${this.tableName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(incidentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to create incident');
      }

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('IncidentService: Error creating incident:', error);
      throw error;
    }
  }

  calculatePriority(urgency, impact) {
    // ServiceNow priority calculation matrix
    const priorityMatrix = {
      '1': { '1': '1', '2': '2', '3': '3' }, // High urgency
      '2': { '1': '2', '2': '3', '3': '4' }, // Medium urgency  
      '3': { '1': '3', '2': '4', '3': '5' }  // Low urgency
    };
    
    return priorityMatrix[urgency]?.[impact] || '4';
  }

  async getIncident(sysId) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?sysparm_display_value=all`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch incident');
      }

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('IncidentService: Error fetching incident:', error);
      throw error;
    }
  }
}