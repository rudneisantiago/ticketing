import request from "supertest";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/orders";
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

  const userOne = global.signin();
  const userTwo = global.signin();

  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticket1.id })
    .expect(201);
});
