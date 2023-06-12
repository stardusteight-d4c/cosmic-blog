import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', function (table) {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.jsonb('tags');
    table.string('coverImage');
    table.dateTime('postedIn').notNullable();
    table.dateTime('lastChange');
    table.jsonb('author').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts');
}
