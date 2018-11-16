import * as Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: categories');
    return knex.schema.createTable('categories', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.text('description');
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Rollingback table: categories');
    return knex.schema.dropTable('categories');
}

