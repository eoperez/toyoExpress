import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    console.log('Creating default: permissions');
    return knex.insert(
        [
            {
                users_id: 1,
                roles_id: 1,
                created_at: Date.now(),
                updated_at: Date.now()
            },
            {
                users_id: 1,
                roles_id: 2,
                created_at: Date.now(),
                updated_at: Date.now()
            },
            {
                users_id: 1,
                roles_id: 3,
                created_at: Date.now(),
                updated_at: Date.now()
            }
        ]
).into('permissions');
}

export async function down(knex: Knex): Promise<any> {
    console.log('Rollingback permissions');
    return knex('permissions').truncate();
}
