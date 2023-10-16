# Sonic - NodeJS

## How to run

#### Setup application

```bash
pnpm dev
```

#### Setup Sonic

```bash
pnpm sonic:up # or docker compose -f sonic/docker-compose up
```

## API Routes

See file [api.http](https://github.com/jdgabriel/sonic-node/blob/main/api.http)

### GET /

```js
GET http://localhost:3000
accept: application/json
```

Response:

```js
{
  hello: "world";
}
```

### POST /

```js
POST http://localhost:3000
content-Type: application/json

{
  "title": "Minhas tarefas",
  "content": "Fazer café"
}
```

### GET /search

```js
GET http://localhost:3000/search?q=café
content-Type: application/json
```

Response:

```js
{
  results: ["post:<id_post>"];
}
```

### GET /suggest

```js
GET http://localhost:3000/suggest?s=caf
content-Type: application/json
```

Response:

```js
{
  results: ["café"];
}
```
