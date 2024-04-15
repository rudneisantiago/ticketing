import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:8222",
});

stan.on("connect", () => {
  console.log("listener connected to NATS");
});
