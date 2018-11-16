import * as Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: taxes');
    return knex.schema.createTable('taxes', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.decimal('percentage').notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<any> {
    console.log('Rollingback table: taxes');
    return knex.schema.dropTable('taxes');
}

