const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const childProcess = require("child_process");

const port = parseInt(process.env.PORT || "3360", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

childProcess.exec("npm run generate", { detached: true, stdio: "ignore" });

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`,
  );
});
