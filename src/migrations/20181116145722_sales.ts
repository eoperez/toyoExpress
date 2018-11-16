import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    console.log('Creating table: sales');
    return knex.schema.createTable('sales', (table) => {
        table.increments('id');
        table.integer('items_id').references('id').inTable('items');
        table.decimal('salesPrice').notNullable();
        table.decimal('taxesTotal');
        table.string('paymentMethod').notNullable();
        table.decimal('discount');
        table.decimal('cashBack');
        table.boolean('isVoid');
        table.dateTime('salesDate').notNullable();
        table.dateTime('update_date');
        table.integer('users_id').references('id').inTable('users');
        table.string('clientName');
        table.string('vinNumber');
        table.string('vModel');
        table.string('vModelYear');
    });
}

export async function down(knex: Knex): Promise<any> {
    console.log('Rollingback table: sales');
    return knex.schema.dropTable('sales');
}

