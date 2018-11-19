import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    console.log('Creating table: itemsSold');
    return knex.schema.createTable('itemsSold', (table) => {
        table.increments('id');
        table.integer('items_id').references('id').inTable('items');
        table.decimal('salesPrice').notNullable();
        table.decimal('itemTax');
    });
}

export async function down(knex: Knex): Promise<any> {
    console.log('Rollingback table: itemsSold');
    return knex.schema.dropTable('itemsSold');
}
