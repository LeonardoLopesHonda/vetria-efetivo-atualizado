test("GET in /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  console.log(responseBody.active_users);
  console.log(responseBody.active_users.Matricula);
  console.log(responseBody.active_users["Nome Completo do Colaborador"]);

  expect(response.status).toBe(200);
});
