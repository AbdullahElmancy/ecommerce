import app from "./app";
import { connection } from "./config/db";
import ENV from "./config/env";


(async () => {
  await connection();

  app.listen(ENV.PORT_DEVELOPER, () => {
    console.log(`🚀 Server running on http://localhost:${ENV.PORT_DEVELOPER}/api/`);
  });
})();
