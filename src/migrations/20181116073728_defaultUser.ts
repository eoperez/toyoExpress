import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    console.log('Creating default user');
    return knex.insert({
        userId: 'admin',
        email: 'noreply@dms.com',
        fName: 'System',
        lName: 'Administrator',
        pass: 'plsletmein',
        created_at: Date.now(),
    }).into('users');
}

export async function down(knex: Knex): Promise<any> {
    console.log('rollingback default user creation');
    return knex('users').where('userId', 'admin').delete();
}
