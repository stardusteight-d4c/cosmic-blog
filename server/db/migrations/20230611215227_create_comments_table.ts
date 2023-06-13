import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comments', function (table) {
    table.uuid('id').primary();
    table.uuid('postId').references('id').inTable('posts');
    table.string('postTitle');
    table.jsonb('owner').notNullable();
    table.text('content').notNullable();
    table.dateTime('postedAt').notNullable();
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('comments');
}
