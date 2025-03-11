import request from "supertest";
import mongoose from "mongoose";
import { OrderStatus } from "@rgsticketing/common";
import { app } from "../../app";
import { Order } from "../../models/order";
import { stripe } from "../../stripe";

// Old implementation of stripe with mock
// jest.mock("../../stripe");

it("stripepa e stripape", async () => {
  const chave = process.env.STRIPE_KEY;
  expect(chave).toBeDefined();
});

it("Returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "fasdfas",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("Returns a 401 when purchasing an order that does not belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    version: 0,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "fasdfas",
      orderId: order.id,
    })
    .expect(401);
});

it("Returns a 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 10,
    status: OrderStatus.Cancelled,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      orderId: order.id,
      token: "asdf",
    })
    .expect(400);
});

it("Returns a 201 with valid inputs", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 1000);
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price,
    status: OrderStatus.Created,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  const stripeCharges = await stripe.charges.list({ limit: 50 });

  const stripeCharge = stripeCharges.data.find((charge) => {
    return charge.amount === price * 100;
  });

  expect(stripeCharge).toBeDefined();
  expect(stripeCharge?.currency).toEqual("brl");

  /**
   * Old implementation of stripe with mock
   */
  // const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

  // expect(chargeOptions.source).toEqual("tok_visa");
  // expect(chargeOptions.amount).toEqual(10 * 100);
  // expect(chargeOptions.currency).toEqual("brl");
});
