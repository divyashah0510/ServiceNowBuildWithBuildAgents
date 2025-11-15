import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '84971442459b454c8ae63b00932bec96'
                    }
                    inventory_app_menu: {
                        table: 'sys_app_application'
                        id: 'ba75f164d66b4de39627cd9a1df30ad9'
                    }
                    inventory_table_module: {
                        table: 'sys_app_module'
                        id: '4d9df9b2c7a849a0b6338bd76a60ea6e'
                        deleted: true
                    }
                    inventory_ui_module: {
                        table: 'sys_app_module'
                        id: '5c163d5ac063466eb802270ab81cb99e'
                    }
                    'inventory-tracker-page': {
                        table: 'sys_ui_page'
                        id: '6efab0b9bd7b4c8ebf7a700772b5e1ba'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '230b7661a354462b821f57eb1e1275c0'
                    }
                    'x_1599811_inventor/main': {
                        table: 'sys_ux_lib_asset'
                        id: 'b30acd9851534477a9291c6657436675'
                        deleted: true
                    }
                    'x_1599811_inventor/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '62556f9541554c23bf34bfd585a95225'
                        deleted: true
                    }
                }
                composite: [
                    {
                        table: 'ua_table_licensing_config'
                        id: '03c6b80063044eabbd0fbddc16f805df'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '084855ba1332443fafc9f023057faee8'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0d6dec73c4e6453fb0a4ebcb4eaaa42f'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'purchase_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e7e2190f82b4145b1a01ee525f92a38'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'min_quantity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1341845b431742e4b839311e9f7d9064'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'item_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '15c85c0280754f7789370a8787f4f613'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'quantity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '197c5936f11d48359aa7567b8f6ff5bc'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'max_quantity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2010dc33683e4ab499adf302faed0fab'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2ca8a7618e4d409faf9a11975c29a250'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'category'
                            value: 'tools'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2f73e31f5b04412ba3dd4fd6fda2893e'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'category'
                            value: 'furniture'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '48075f4323bd40d289c56933192b236d'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'item_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a728481d87a401e9876c0fd145e740a'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'assigned_to'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '618ae8cd9815402ebbe3e27ac0a003bb'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'item_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '637c6f6e0f3e4a0ca4b4266a79838df3'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'category'
                            value: 'electronics'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '66bf5f1122c14836aa37089f03ef7ef0'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'unit_cost'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '690649ebc08942e9b358c02e48da16ba'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'quantity'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7f3592dedf084ca6a0922e0e873f0dbf'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'category'
                            value: 'consumables'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '80cbfec0470043ddb6fcb0da226c20d6'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8deff475397049909ebda6f86bff288e'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'item_description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '973639d04e3349ab82bc14d9d11b2c87'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a8deea831cce43df989434392b0d08b3'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b0896fd179c64e308e8803fc1639258d'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'category'
                            value: 'other'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b422119c331f497d8dc7db2718107ae7'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b4f4289ef9284a17ae204442e2f8bf8f'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'unit_cost'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b61a09028c564b919e635f026bcbcea9'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'max_quantity'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bf4ee2cd16784a16abbe1e01ec4909d8'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'category'
                            value: 'office_supplies'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cfb2d5fb04b344c8b1897a32402e4eed'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd09ce9ae917447c98a0039dc9eb11145'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'assigned_to'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd439ef44d0ad458ebcf2adc874295eaa'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'min_quantity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e11d23c904664c81b0c6a39c79c32a75'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'purchase_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f470d69782254619afcd13fa7f5dea16'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'location'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f500b44db75643dc9525bc36cfd92c23'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f5cc3d79715d4ec59d137057cab082b0'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'fca4785994004607a12177c81c7fc2d5'
                        key: {
                            name: 'x_1599811_inventor_inventory_item'
                        }
                    },
                ]
            }
        }
    }
}
