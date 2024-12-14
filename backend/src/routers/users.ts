import { Hono } from "hono";

const user = new Hono();

user.post("/", (c) => {
  return c.json({ message: "User created" }, 200);
});

user.get("/:id", (c) => {
  const id = c.req.param('id')

  return c.json({ message: `User with id ${id}` }, 200);
});

user.put("/", (c) => {
  return c.json({ message: "User updated success" }, 200);
});

user.delete("/", (c) => {
  return c.json({ message: "User deleted success" }, 200);
});

export default user;
