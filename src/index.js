const http = require("http");
const getUsers = require("./modules/users");
const { URL } = require("url");

const hostname = "127.0.0.1";
const port = 3003;
const address = `http://${hostname}:${port}/`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, address);
  console.log(url);
  console.log(url.searchParams);
  for (const key of url.searchParams.keys()) {
    if ((key !== "hello") & (key !== "users")) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end("{}");
    }
  }
  if (url.searchParams.has("hello")) {
    const userName = url.searchParams.get("hello");
    if (userName) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(`Hello,  ${userName}!`);
    }
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Enter a name`);
  }

  if (url.searchParams.has("users")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(getUsers());
    res.end();
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
