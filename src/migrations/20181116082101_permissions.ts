import * as Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Creating table: permissions');
    return knex.schema.createTable('permissions', (table) => {
        table.increments('id');
        table.integer('users_id').references('id').inTable('users').notNullable().onDelete('cascade');
        table.integer('roles_id').references('id').inTable('roles').notNullable().onDelete('cascade');
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    console.log('Rollingback table: permissions');
    return knex.schema.dropTable('permissions');
}
