import {
  QuickRouteAddressLookup,
  QuickRouteCacheMemory,
  QuickRouteProviderTomTom,
} from "@hilaryosborne/quickroute-address-lookup";
import { FastifyReply, FastifyRequest } from "fastify";
import { nanoid } from "nanoid";
import QuickRouteWinstonLogger from "./server.winston.logger";

const ServerAddressSearchHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const lookup = new QuickRouteAddressLookup({
    logger: new QuickRouteWinstonLogger({ level: process.env.SERVER_LOG_LEVEL || "info" }),
    cache: new QuickRouteCacheMemory(),
    provider: new QuickRouteProviderTomTom({
      api: {
        key: process.env.PROVIDER_TOMTOM_API_KEY!,
        protocol: process.env.PROVIDER_TOMTOM_API_PROTOCOL,
        host: process.env.PROVIDER_TOMTOM_API_HOST,
      },
    }),
  });

  const results = await lookup.searchByPartialAddress({
    query: "47 Dan Street, Gracevile, QLD",
    options: { limit: 15 },
    expands: ["geo", "address", "provider"],
    tracking: {
      client: "USR-123456",
      correlation: nanoid(),
      conversation: nanoid(),
    },
  });

  reply.send({ results });
};

export default ServerAddressSearchHandler;
