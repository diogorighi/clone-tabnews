import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response.status).toBe(201);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const responseAfter = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(responseAfter.status).toBe(200);

  const responseBodyAfter = await responseAfter.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBodyAfter.length).toEqual(0);
});
