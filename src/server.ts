import app from "./app";
import ENV from "./config/env";




app.listen(ENV.PORT_DEVELOPER, () => {
  console.log(`🚀 Server running on http://localhost:${ENV.PORT_DEVELOPER}/api/`);
});