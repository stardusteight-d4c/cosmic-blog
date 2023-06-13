import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('favorites', function (table) {
    table.uuid('userId').notNullable()
    table.uuid('postId').notNullable()
    table.primary(['userId', 'postId']);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('favorites');
}
