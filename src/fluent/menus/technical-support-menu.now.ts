import '@servicenow/sdk/global'
import { ApplicationMenu } from '@servicenow/sdk/core'

export const technical_support_menu = ApplicationMenu({
  $id: Now.ID['tech-support-menu'],
  title: 'Report Technical Issue',
  hint: 'Submit a technical support request',
  order: 100,
  active: true,
  link_type: 'direct',
  arguments: 'x_1599811_inventor_technical_incident.do',
  roles: [],
  application_menu_categorization: 'none'
})