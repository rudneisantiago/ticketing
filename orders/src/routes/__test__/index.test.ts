import request from "supertest";
import { Ticket } from "../../models/ticket";
import { app } from "../../app";

const createTicket = async () => {
  const ticket = Ticket.build({
    price: 10,
    title: "Ticket",
  });

  await ticket.save();
  return ticket;
};

it("fetch orders for an particular user", async () => {
  const ticket1 = await createTicket();
  const ticket2 = await createTicket();
  const ticket3 = await createTicket();

  const user1 = global.signin();
  const user2 = global.signin();

  // UserOne
  await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  // UserOne
  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", user2)
    .expect(200);

  expect(response.body.length).toEqual(2);

  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[0].ticket.id).toEqual(ticket2.id);
  expect(response.body[0].id).toEqual(orderOne.id);

  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[1].ticket.id).toEqual(ticket3.id);
});
