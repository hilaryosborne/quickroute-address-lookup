# quickroute-address-lookup-demo

## Getting Started
- run `npm i`
- run `npm run dev`

create a .env file with the following

```
SERVER_LOG_LEVEL=info
SERVER_PORT=3045
PROVIDER_TOMTOM_API_KEY=<API KEY>
PROVIDER_TOMTOM_API_PROTOCOL=https
PROVIDER_TOMTOM_API_HOST=api.tomtom.com
```

Simple example of the quickroute address lookup library

- GET http://localhost:3045/address/search
