import request from "supertest";
import { app } from "../../app";

it("Fails when an email that does not exists is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "teste@teste.com",
      password: "1234",
    })
    .expect(400);
});

it("Fails when incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@teste.com",
      password: "1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "teste@teste.com",
      password: "12345",
    })
    .expect(400);
});

it("Response with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@teste.com",
      password: "1234",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "teste@teste.com",
      password: "1234",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
