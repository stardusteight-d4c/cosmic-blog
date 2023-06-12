import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary();
    table.string('email').notNullable().unique();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('avatar');
    table.string('userRole');
    table.jsonb('socialLinks');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
