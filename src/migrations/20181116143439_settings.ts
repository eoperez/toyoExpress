import * as Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: settings');
    return knex.schema.createTable('settings', (table) => {
        table.increments('id');
        table.text('banner');
        table.string('dbLocation');
        table.string('locale');
        table.text('receiptAttributes');
        table.text('quoteAttributes');
        table.boolean('isCashAllowed');
        table.boolean('isCheckAllowed');
        table.boolean('isCreditCardAllowed');
        table.boolean('isStoreCreditAllowed');
        table.boolean('isQuoteAllowed');
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<any> {
    console.log('Rollingback table: settings');
    return knex.schema.dropTable('settings');
}

