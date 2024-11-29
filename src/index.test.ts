import request from "supertest";
import app from "./index";

test("création d'une nouvelle tâche", async () => {
  const response = await request(app)
    .post("/todo")
    .send({ title: "Test Task" });
  expect(response.status).toBe(201);
  expect(response.body.title).toBe("Test Task");
  expect(response.body.completed).toBe(false);
});

test("Afficher toutes les tâches", async () => {
  const response = await request(app).get("/todo");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

test("Mettre à jour les tâches", async () => {
  const createResponse = await request(app)
    .post("/todo")
    .send({ title: "Task to Update" });
  const taskId = createResponse.body.id;

  const response = await request(app)
    .put(`/todo/${taskId}`)
    .send({ title: "Updated Task", completed: true });
  expect(response.status).toBe(200);
  expect(response.body.title).toBe("Updated Task");
  expect(response.body.completed).toBe(true);
});

test("Supprimer une tâche", async () => {
  const createResponse = await request(app)
    .post("/todo")
    .send({ title: "Task to Delete" });
  const taskId = createResponse.body.id;

  const deleteResponse = await request(app).delete(`/todo/${taskId}`);
  expect(deleteResponse.status).toBe(204);
});
