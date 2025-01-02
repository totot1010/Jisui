import { Hono } from "hono";
import { UserRepository } from "../infrastructure/repository/user.repository";
import { PostRepository } from "../infrastructure/repository/post.repository";
import { PostQueryService } from "../application/post/service/postQuery.service";
import { UserQueryService } from "../application/user/service/userQuery.service";
import { GetAllPostWithUserService } from "../application/query/service/getAllPostWithUser.service";
import { requiredAuth } from "./middleware";

const post = new Hono().basePath("/posts");

post.use(requiredAuth);

const userRepository = new UserRepository();
const postRepository = new PostRepository();

const postQueryService = new PostQueryService(postRepository);
const userQueryService = new UserQueryService(userRepository);

post.post("/", (c) => {
  return c.json({ message: "post created" }, 200);
});

post.post("/likes", (c) => {
  return c.json({ message: "post liked" }, 200);
});

post.post("/comments", (c) => {
  return c.json({ message: "comment created" }, 200);
});

// みんなの投稿
post.get("/", async (c) => {
  const getAllPostWithUserService = new GetAllPostWithUserService(postQueryService, userQueryService);
  const results = await getAllPostWithUserService.execute();
  return c.json(results, 200);
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
