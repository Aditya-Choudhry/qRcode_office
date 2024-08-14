import { createServer } from "http";
import { parse } from "url";
import { fileURLToPath } from "url";
import path from "path";
import serveHandler from "serve-handler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  serveHandler(req, res, {
    public: path.resolve(__dirname, "dist"),
    rewrites: [{ source: "/*", destination: "/index.html" }],
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Frontend server is running on http://localhost:${port}`);
});