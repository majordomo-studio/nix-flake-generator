import { defineDb, defineTable, column } from 'astro:db';

const BaseFlake = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    url: column.text(),
    // "os" for base OS flakes, "dev" for development environment flakes.
    type: column.text(),
  },
});

const Package = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    description: column.text(),
  },
});

export default defineDb({
  tables: { BaseFlake, Package },
});
