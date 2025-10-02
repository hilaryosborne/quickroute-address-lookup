import { QuickRouteAddressLookup, QuickRouteCacheMemory, QuickRouteLoggerConsole, QuickRouteProviders, QuickRouteProviderTomTom } from "@quickroute/address-lookup";
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
      // rate limits should be set per provider as each provider will have different limits
      limits: { maxRequests: process.env.TOMTOM_USER_MAX_REQUESTS || 5, per: process.env.TOMTOM_USER_MAX_REQUESTS_PER || "minute" },
    }),
  });

  // have the method of partial address to allow for more specific methods later on
  const results = await lookup.searchByPartialAddress({
    // free text address to lookup
    // we don't want to require the consumers to do additional work to parse out address components
    query: "47 Dan Stre",
    // used for rate limiting
    // maybe this could be used to track user uses?
    // assumption is that the user would be signed in by this point
    clientId: "USR-123456",
    // used for tracing requests through and the provider systems (optional)
    correlationId: nanoid(),
    // the latLong is optional, but can help improve accuracy
    latLong: { lat: 37.422, lng: -122.084 },
    // allow for control over what data is returned
    // this will default to address if not provided
    expands: ["geo", "address", "provider"],
  });

  reply.send({ results });
};

export default ServerAddressSearchHandler;
