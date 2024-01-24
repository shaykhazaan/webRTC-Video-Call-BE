import http from "http";
import express, { Express } from "express";

const app: Express = express();
const server: http.Server = http.createServer(app);

server.listen(2020, () => {
  console.log("server running ");
});
