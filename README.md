# Quickroute Address Lookup

## Quick Start

add the following .npmrc file to your project 
```
@hilaryosborne:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=GH_TOKEN
```

run the following command to install the library
```
npm i -S @hilaryosborne/quickroute-address-lookup
```

minimal usage requires no configuration
```typescript
import { QuickRouteAddressLookup } from "@hilaryosborne/quickroute-address-lookup";

const lookup = new QuickRouteAddressLookup();

const results = await lookup.searchByPartialAddress({
    query: "47 Dan Street, Gracevile, QLD",
});
```

- (link) https://github.com/hilaryosborne/quickroute-address-lookup-demo

## Kitchen Sink Example


Lookup Usage:
```typescript
import {
  QuickRouteAddressLookup,
  QuickRouteCacheMemory,
  QuickRouteLoggerConsole,
  QuickRouteProviderTomTom,
} from "@hilaryosborne/quickroute-address-lookup";

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
        api: {
            key: process.env.PROVIDER_TOMTOM_API_KEY!,
            protocol: process.env.PROVIDER_TOMTOM_API_PROTOCOL,
            host: process.env.PROVIDER_TOMTOM_API_HOST,
        },
    }),
});

 // have the method of partial address to allow for more specific methods later on
const results = await lookup.searchByPartialAddress({
    // free text address to lookup
    // we don't want to require the consumers to do additional work to parse out address components
    query: "47 Dan Street, Gracevile, QLD",
    // options: { limit: 5, lat: -27.565843, lng: 152.800113, radius: 3 },
    options: { limit: 15 },
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
```

### TomTom Provider Configuration

#### Environment Variables

- PROVIDER_TOMTOM_API_KEY=<your api key>
- PROVIDER_TOMTOM_API_PROTOCOL=https
- PROVIDER_TOMTOM_API_HOST=api.tomtom.com
- PROVIDER_TOMTOM_API_PORT=8080 (optional)

```typescript
new QuickRouteProviderTomTom({
    // api key can be provided here or via an environment variable
    api: {
        key: process.env.PROVIDER_TOMTOM_API_KEY!,
        protocol: process.env.PROVIDER_TOMTOM_API_PROTOCOL,
        host: process.env.PROVIDER_TOMTOM_API_HOST,
    },
})
```