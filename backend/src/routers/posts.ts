import { Hono } from "hono";

const post = new Hono();

post.post("/", (c) => {
  return c.json({ message: "post created" }, 200);
});

post.post("/likes", (c) => {
  return c.json({ message: "post liked" }, 200);
});

post.post("/comments", (c) => {
  return c.json({ message: "comment created" }, 200);
});

post.get("/:id", (c) => {
  const id = c.req.param('id')
  return c.json({ message: `post with id ${id}` }, 200);
});

post.get("/:userId", (c) => {
  const userId = c.req.param('userId')
  return c.json({ message: `post with userId ${userId}` }, 200);
});

post.delete("/", (c) => {
  return c.json({ message: "post deleted success" }, 200);
});

export default post;
