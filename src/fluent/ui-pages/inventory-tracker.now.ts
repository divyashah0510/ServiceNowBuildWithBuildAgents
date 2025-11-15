import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import inventoryPage from '../../client/index.html'

export const inventory_tracker_page = UiPage({
  $id: Now.ID['inventory-tracker-page'],
  endpoint: 'x_1599811_inventor_inventory_tracker.do',
  description: 'React-based inventory tracking application',
  category: 'general',
  html: inventoryPage,
  direct: true
})