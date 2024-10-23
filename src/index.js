import app from "./app.js";
import "dotenv/config";
import { connectToDatabase } from "./db.js";

connectToDatabase();

const port = process.env.PORT || 3001;

app.listen(port);
console.log(`Server on port ${port}`);
