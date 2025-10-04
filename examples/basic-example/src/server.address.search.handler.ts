import {
  QuickRouteAddressLookup,
  QuickRouteCacheMemory,
  QuickRouteLoggerConsole,
  QuickRouteProviders,
  QuickRouteProviderTomTom,
} from "@quickroute/address-lookup";
import { FastifyReply, FastifyRequest } from "fastify";
import { nanoid } from "nanoid";

const ServerAddressSearchHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const lookup = new QuickRouteAddressLookup({
    // provide simple loggers with the ability to develop more depending on the consumer
    // regulate with a shared logger interface
    logger: new QuickRouteLoggerConsole({ level: process.env.SERVER_LOG_LEVEL || "info" }),
    // provide a default in memory cache to reduce requests to the provider
    // this is most likely to be customised by the comsumer with something like redis
    cache: new QuickRouteCacheMemory(),
    // provide default providers but to allow for quick onboarding of new providers
    // allow for the consumer to provide their own providers if needed
    provider: new QuickRouteProviderTomTom({
      // api key can be provided here or via an environment variable
      apiKey: process.env.TOMTOM_API_KEY!,
    }),
  });

  // have the method of partial address to allow for more specific methods later on
  const results = await lookup.searchByPartialAddress({
    // free text address to lookup
    // we don't want to require the consumers to do additional work to parse out address components
    query: "47 Dan Stre",
    // the latLong is optional, but can help improve accuracy
    latLong: { lat: 37.422, lng: -122.084 },
    // allow for control over what data is returned
    // this will default to address if not provided
    expands: ["geo", "address", "provider"],
    // tracking ids (optional)
    tracking: {
      client: "USR-123456",
      correlation: nanoid(),
      conversation: nanoid(),
    },
  });

  reply.send({ results });
};

export default ServerAddressSearchHandler;
