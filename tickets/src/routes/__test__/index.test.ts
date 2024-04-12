import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  const title = "Title";
  const price = 10;
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: title,
    price: price,
  });
};

it("can fetch a list of tickets", async () => {
  const loop = 3;
  for (let index = 0; index < loop; index++) {
    await createTicket();
  }

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(loop);
});
