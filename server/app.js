const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client.html");
});

io.on("connection", function(socket) {
  console.log("User connected:", socket.client.id);
  socket.on("disconnect", function() {
    console.log("User disconnected:", socket.client.id);
  });
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    console.log("Message from: ", socket.client.id, msg);
    io.emit('chat message', { author: socket.client.id, msg });
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
