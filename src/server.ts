import app from "./app";

const port = process.env.PORT_DEVELOPER;


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});