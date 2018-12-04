import * as Knex from 'knex';


export async function up(knex: Knex): Promise<any> {
    console.log('Creating default: settings');
    return knex.insert({
        banner: './assets/logo.png',
        dbLocation: './data/dms.db',
        locale: 'en',
        receiptAttributes: '{}',
        quoteAttributes: '{}',
        isCashAllowed: true,
        isCheckAllowed: true,
        isCreditCardAllowed: true,
        isStoreCreditAllowed: true,
        isQuoteAllowed: true,
        created_at: Date.now(),
        updated_at: Date.now()
    }).into('settings');
}


export async function down(knex: Knex): Promise<any> {
    console.log('Rollingback default: settins');
    return knex('settings').truncate();
}

