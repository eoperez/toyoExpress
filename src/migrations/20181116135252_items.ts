import * as Knex from 'knex';


export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: items');
    return knex.schema.createTable('items', (table) => {
        table.increments('id');
        table.string('itemId').unique();
        table.text('description');
        table.decimal('cost').notNullable();
        table.decimal('priceLow');
        table.decimal('priceMid');
        table.decimal('priceDefault').notNullable();
        table.boolean('needBarcode');
        table.text('equivalent');
        table.integer('categories_id').references('id').inTable('categories');
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Rollingback table: items');
    return knex.schema.dropTable('items');
}

