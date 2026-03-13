/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("user_album_likes", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    album_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: '"albums"',
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint(
    "user_album_likes",
    "unique_user_album_like",
    "UNIQUE(user_id, album_id)",
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("user_album_likes");
};
