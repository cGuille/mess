MESS
====

MESS stands for **Mess Event Source Server**.

## What MESS does.

It is a microservice which takes the responsibility of:

- Exposing an HTTP API to notify HTTP clients with JSON messages.
- Transforming those JSON messages into a well formed, EventSource compliant event.
- Holding open HTTP connections with HTTP clients hitting the EventSource endpoint.

## What MESS does not do.

It does not manage authentication over the HTTP API. It means that:

- You should open only the `/` URI to the whole Internet, as this is the EventSource endpoint that HTTP clients must reach in order to listen to events.
- You should not open the other URIs (`/api/*`) to the whole Internet. It should be reachable only from your other services (for example, the website backend which triggers notifications).

## Usage

- The `MESS_PORT=3000 npm start` command runs the server on port `3000`.
- The `npm run dev` runs the server on port `3000` with `nodemon`.
- The `npm run debug` runs the server on port `3000` with `node-debug`.

When started in `development` environment, MESS mounts a `/demo` URI so that you can check how MESS works. Just visit [localhost:3000/demo](http://localhost:3000/demo).
