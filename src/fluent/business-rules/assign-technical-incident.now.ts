import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { assignTechnicalIncident } from '../../server/assign-technical-incident.js'

export const technical_incident_assignment = BusinessRule({
  $id: Now.ID['tech-incident-assignment'],
  name: 'Technical Incident Auto Assignment',
  table: 'incident',
  when: 'before',
  action: ['insert'],
  script: assignTechnicalIncident,
  order: 100,
  active: true,
  condition: "current.category == 'inquiry' && current.subcategory != ''",
  description: 'Automatically assigns technical incidents to appropriate teams based on subcategory'
})