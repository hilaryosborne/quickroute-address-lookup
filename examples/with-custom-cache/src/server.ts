import { config } from "dotenv";

config();

import Fastify from "fastify";
import ServerAddressSearchHandler from "./server.address.search.handler";
import ServerReadyHandler from "./server.ready.handler";

const fastify = Fastify({ logger: true });

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.get("/address/search", ServerAddressSearchHandler);

fastify.listen({ port: process.env.SERVER_PORT || 3000, host: "0.0.0.0" }, ServerReadyHandler);
