import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const acceptedMethods = ["POST", "GET"];

  if (!acceptedMethods.includes(request.method)) {
    return response.status(405).json({
      message: "Method Not Allowed",
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const migrationsDefaultConfig = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method == "GET") {
      const pendingMigrations = await migrationRunner(migrationsDefaultConfig);
      response.status(200).json(pendingMigrations);
    }

    if (request.method == "POST") {
      const migratedMigrations = await migrationRunner({
        ...migrationsDefaultConfig,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        response.status(201).json(migratedMigrations);
      }

      response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
