import '@servicenow/sdk/global'
import { Table, StringColumn, IntegerColumn, DateColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_1599811_inventor_inventory_item = Table({
  name: 'x_1599811_inventor_inventory_item',
  label: 'Inventory Item',
  schema: {
    item_name: StringColumn({
      label: 'Item Name',
      maxLength: 100,
      mandatory: true
    }),
    item_description: StringColumn({
      label: 'Description',
      maxLength: 255
    }),
    category: StringColumn({
      label: 'Category',
      maxLength: 50,
      choices: {
        electronics: { label: 'Electronics', sequence: 0 },
        office_supplies: { label: 'Office Supplies', sequence: 1 },
        furniture: { label: 'Furniture', sequence: 2 },
        tools: { label: 'Tools', sequence: 3 },
        consumables: { label: 'Consumables', sequence: 4 },
        other: { label: 'Other', sequence: 5 }
      },
      dropdown: 'dropdown_with_none'
    }),
    quantity: IntegerColumn({
      label: 'Current Quantity',
      mandatory: true,
      default: '0',
      min: 0
    }),
    min_quantity: IntegerColumn({
      label: 'Minimum Quantity',
      default: '0',
      min: 0
    }),
    max_quantity: IntegerColumn({
      label: 'Maximum Quantity',
      default: '100',
      min: 0
    }),
    location: StringColumn({
      label: 'Location',
      maxLength: 100
    }),
    assigned_to: ReferenceColumn({
      label: 'Assigned To',
      referenceTable: 'sys_user'
    }),
    purchase_date: DateColumn({
      label: 'Purchase Date'
    }),
    unit_cost: StringColumn({
      label: 'Unit Cost',
      maxLength: 20
    }),
    active: BooleanColumn({
      label: 'Active',
      default: 'true'
    }),
    notes: StringColumn({
      label: 'Notes',
      maxLength: 1000
    })
  },
  accessible_from: 'public',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  display: 'item_name',
  extensible: false
})