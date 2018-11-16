import * as Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: itemsTaxes');
    return knex.schema.createTable('itemsTaxes', (table) => {
        table.increments('id');
        table.integer('taxes_id').references('id').inTable('taxes');
        table.integer('items_id').references('id').inTable('items');
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Rollingback table: itemsTaxes');
    return knex.schema.dropTable('itemsTaxes');
}
