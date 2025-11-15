import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import incidentProducerPage from '../../client/incident-producer.html'

export const technical_incident_producer = UiPage({
  $id: Now.ID['technical-incident-producer'],
  endpoint: 'x_1599811_inventor_technical_incident.do',
  description: 'Technical issue incident record producer for ESC portal',
  category: 'general',
  html: incidentProducerPage,
  direct: true
})