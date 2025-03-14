import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET in /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const database = responseBody.dependencies.database;

  expect(database.version).toBeDefined();
  expect(typeof database.version).toEqual("string");
  expect(database.version).toEqual("16.0");

  expect(database.max_connections).toBeDefined();
  expect(typeof database.max_connections).toEqual("number");
  expect(database.max_connections).toEqual(100);

  expect(database.opened_connections).toBeDefined();
  expect(typeof database.opened_connections).toEqual("number");
  expect(database.opened_connections).toEqual(1);
});
