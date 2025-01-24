import database from "infra/database.js";
async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const updatedAt = new Date().toISOString();
  const version = (await database.query("SHOW server_version;")).rows[0]
    .server_version;
  const max_connections = (await database.query("SHOW max_connections;"))
    .rows[0].max_connections;
  const opened_connections = (
    await database.query({
      text: "SELECT COUNT(*)::int as opened_connections from pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    })
  ).rows[0].opened_connections;

  console.log(opened_connections);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: parseInt(max_connections),
        opened_connections: opened_connections,
      },
    },
  });
}

export default status;
