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
  // 1. Hapus dulu constraint lama jika (mungkin) ada, agar tidak bentrok
  pgm.dropConstraint("playlists", "fk_playlists.owner_users.id", {
    ifExists: true,
  });
  pgm.dropConstraint("playlists", "fk_playlists.username_users.id", {
    ifExists: true,
  });

  // 2. Langsung tambahkan Foreign Key pada kolom 'owner' yang sudah ada
  pgm.addConstraint("playlists", "fk_playlists.owner_users.id", {
    foreignKeys: {
      columns: "owner",
      references: "users(id)",
      onDelete: "CASCADE",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint("playlists", "fk_playlists.owner_users.id");
};
