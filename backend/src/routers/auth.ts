import { Hono } from "hono";

const auth = new Hono();

auth.post("/login", (c) => {
  return c.json({ message: "Login success" }, 200);
});

auth.post("/logout", (c) => {
  return c.json({ message: "Logout success" }, 200);
});


export default auth;
