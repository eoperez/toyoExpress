import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    console.log('Creating table: salesTransactions');
    return knex.schema.createTable('salesTransactions', (table) => {
        table.increments('id');
        table.integer('itemsSold_id').references('id').inTable('itemsSold');
        table.decimal('salesPrice').notNullable();
        table.decimal('taxesTotal');
        table.string('paymentMethod').notNullable();
        table.decimal('discount');
        table.decimal('cashBack');
        table.boolean('isVoid');
        table.dateTime('salesDate').notNullable();
        table.dateTime('update_date');
        table.integer('users_id').references('id').inTable('users');
        table.string('clientNam');
        table.string('vinNumber');
        table.string('vModel');
        table.string('vModelYear');
    });
}

export async function down(knex: Knex): Promise<any> {
    console.log('Rollingback table: salesTransactions');
    return knex.schema.dropTable('salesTransactions');
}

