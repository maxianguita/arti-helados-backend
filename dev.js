// dev.js
import app from "./server.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend en local: http://localhost:${PORT}`);
});
