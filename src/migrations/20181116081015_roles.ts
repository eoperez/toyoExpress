import * as Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: roles.');
    return knex.schema.createTable('roles', (table) => {
        table.increments('id');
        table.string('name').unique();
        table.text('description');
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Rollingback table: roles');
    return knex.schema.dropTable('roles');
}
