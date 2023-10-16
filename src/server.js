import express from "express";
import { randomUUID } from "node:crypto";

import * as Sonic from "sonic-channel";

const sonicChannelIngest = new Sonic.Ingest({
  host: "localhost",
  port: 1491,
  auth: "SecretPassword",
});

sonicChannelIngest.connect({
  connected: () => console.log("Sonic Ingest connected"),
  disconnected: () => console.log("Sonic Ingest disconnected"),
  error: (error) => console.log("Sonic Ingest error", error),
});

const sonicChannelSearch = new Sonic.Search({
  host: "localhost",
  port: 1491,
  auth: "SecretPassword",
});

sonicChannelSearch.connect({
  connected: () => console.log("Sonic Search connected"),
  disconnected: () => console.log("Sonic Search disconnected"),
  error: (error) => console.log("Sonic Search error", error),
});

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({ hello: "world" });
});

app.post("/", async (req, res) => {
  const { title, content } = req.body;
  const id = randomUUID();
  const post = { id, title, content };
  await sonicChannelIngest.push("posts", "default", `post:${id}`, `${title} ${content}`, {
    lang: "por",
  });

  return res.json({ post });
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  const results = await sonicChannelSearch.query("posts", "default", q, {
    lang: "por",
  });

  return res.json({ results });
});

app.get("/suggest", async (req, res) => {
  const { s } = req.query;
  const results = await sonicChannelSearch.suggest("posts", "default", s);

  return res.json({ results });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
