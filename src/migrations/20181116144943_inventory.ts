import * as Knex from 'knex';


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: inventory');
    return knex.schema.createTable('inventory', (table) => {
        table.increments('id');
        table.integer('items_id').references('id').inTable('items');
        table.integer('qty').notNullable();
        table.string('location');
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Rollingback table: inventory');
    return knex.schema.dropTable('inventory');
}
