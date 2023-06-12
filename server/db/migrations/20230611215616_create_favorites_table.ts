import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('favorites', function (table) {
    table.uuid('userId').references('id').inTable('users');
    table.uuid('postId').references('id').inTable('posts');
    table.primary(['userId', 'postId']);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('favorites');
}
