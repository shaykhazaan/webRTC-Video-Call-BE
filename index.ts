import http from "http";
import express, { Express } from "express";
import cors from "cors";
import { Server } from "socket.io";

const app: Express = express();
const server: http.Server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser"), { signal: signalData, from, name };
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

const PORT = 2020;
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
