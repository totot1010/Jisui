import { Hono } from "hono";
import { UserRepository } from "../infrastructure/repository/user.repository";
import { PostRepository } from "../infrastructure/repository/post.repository";
import { PostQueryService } from "../application/post/service/postQuery.service";
import { UserQueryService } from "../application/user/service/userQuery.service";
import { GetAllPostWithUserService } from "../application/query/service/getAllPostWithUser.service";
import { requiredAuth } from "./middleware";
import { HttpStatus } from "../shared/constants/statusCode";
import { LikePostRequestDto } from "../application/post/dto/likePost.dto";
import { PostLikeService } from "../application/post/service/postLike.service";
import { isPostCountType } from "../domain/post/types/postCountType";
import { CreateCommentService } from "../application/post/service/createComment.service";
import { CreateCommentRequestDto } from "../application/post/dto/createComment.dto";


// c.getで取得するパラメータの型
type Variables = {
  userId?: string
}

const post = new Hono<{ Variables: Variables }>().basePath("/posts");

post.use(requiredAuth);

const userRepository = new UserRepository();
const postRepository = new PostRepository();

const postQueryService = new PostQueryService(postRepository);
const userQueryService = new UserQueryService(userRepository);

post.post("/", (c) => {
  return c.json({ message: "post created" }, HttpStatus.CREATED);
});

post.post("/likes", async (c) => {
  const body = await c.req.json();
  const { userId, postId } = body;
  const likePostRequestDto = new LikePostRequestDto(postId, userId);
  const postLikeService = new PostLikeService(postRepository)
  await postLikeService.toggleLike(likePostRequestDto);
  return c.json({ message: "" }, HttpStatus.OK);
});

post.post("/:id/comments", async (c) => {
  // ユーザーのコメントを作成する
  const postId = c.req.param('id');
  const userId = c.get('userId');
  const body = await c.req.json();
  const { content } = body;

  if (!postId || !userId) {
    return c.json({ message: "postId, userId is required" }, HttpStatus.BAD_REQUEST);
  }

  const createCommentService = new CreateCommentService(postRepository);
  await createCommentService.execute(new CreateCommentRequestDto(postId, userId, content));

  return c.json({ message: "comment created" }, HttpStatus.CREATED);
});

// みんなの投稿
post.get("/", async (c) => {
  const getAllPostWithUserService = new GetAllPostWithUserService(postQueryService, userQueryService);
  const results = await getAllPostWithUserService.execute();
  return c.json(results, HttpStatus.OK);
});


post.get("/:id", (c) => {
  const id = c.req.param('id')
  return c.json({ message: `post with id ${id}` }, HttpStatus.OK);
});

post.get("/:userId", (c) => {
  const userId = c.req.param('userId')
  return c.json({ message: `post with userId ${userId}` }, HttpStatus.OK);
});

post.get("/:userId/counts", async (c) => {
  const userId = c.req.param('userId')
  const type = c.req.query('type')
  if (!type) {
    return c.json({ message: "type is required" }, HttpStatus.BAD_REQUEST);
  }
  if (!isPostCountType(type)) {
    return c.json({ message: "type is invalid" }, HttpStatus.BAD_REQUEST);
  }

  const postCount = await postQueryService.countByUserIdAndType(userId, type);
  return c.json({ count: postCount }, HttpStatus.OK);
});

post.delete("/", (c) => {
  return c.json({ message: "post deleted success" }, HttpStatus.OK);
});

export default post;
