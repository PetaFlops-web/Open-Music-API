import app from "./src/app.js";
import "dotenv/config";

const PORT = process.env.PORT || process.env.PGPORT;
const HOST = process.env.HOST || process.env.PGHOST;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${HOST}:${PORT}`);
});
