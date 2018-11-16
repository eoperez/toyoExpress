import * as Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: users');
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('userId');
        table.string('email');
        table.string('fName').notNullable();
        table.string('lName').notNullable();
        // TODO: encrypt the password.
        table.string('pass');
        table.timestamp('lastLogin');
        table.unique(['userId', 'email']);
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder>  {
    console.log('Rollingback table: users');
    return knex.schema.dropTable('users');
}
