import '@servicenow/sdk/global'
import { ApplicationMenu } from '@servicenow/sdk/core'

export const inventory_menu = ApplicationMenu({
  $id: Now.ID['inventory-app-menu'],
  title: 'Inventory Tracker',
  hint: 'Manage and track inventory items',
  order: 100,
  active: true,
  link_type: 'direct',
  arguments: 'x_1599811_inventor_inventory_tracker.do',
  roles: [],
  application_menu_categorization: 'none'
})