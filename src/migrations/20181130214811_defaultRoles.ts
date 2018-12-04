import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    console.log('Creating default: roles');
    return knex.insert(
        [
            {
                name: 'System Manager',
                description: 'Can change all application settings',
                created_at: Date.now(),
                updated_at: Date.now()
            },
            {
                name: 'Inventory Manager',
                description: 'Manage inventory',
                created_at: Date.now(),
                updated_at: Date.now()
            },
            {
                name: 'POS',
                description: 'Can use Point of Sales',
                created_at: Date.now(),
                updated_at: Date.now()
            }
        ]
).into('roles');
}

export async function down(knex: Knex): Promise<any> {
    console.log('Rollingback roles');
    return knex('roles').truncate();
}
