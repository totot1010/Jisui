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
import { ValidationError } from "../shared/exceptions/validationError";
import { HTTPException } from "hono/http-exception";
import { CreatePostService } from "../application/post/service/createPost.service";
import { CreatePostRequestDto } from "../application/post/dto/createPost.dto";
import { GetUserPostHistoryService } from "../application/post/service/getUserPostHistory.service";
import { withTransaction } from "../infrastructure/prisma/withTransaction";
import { PostImageRepositoryLocal } from "../infrastructure/repository/postImage.repository.local";


// c.getで取得するパラメータの型
type Variables = {
  userId?: string
}

const post = new Hono<{ Variables: Variables }>().basePath("/posts");

// エラーハンドリング
post.onError((error: any, c) => {
  if (error instanceof ValidationError) {
    return c.json({ message: String(error.message) }, HttpStatus.BAD_REQUEST);
  }
  if (error instanceof HTTPException) {
    return error.getResponse();
  }
  console.error(error);
  return c.json({ message: "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
});

post.use(requiredAuth);

const userRepository = new UserRepository();
const postRepository = new PostRepository();

const postQueryService = new PostQueryService(postRepository);
const userQueryService = new UserQueryService(userRepository);

post.post("/", async (c) => {
  const userId = c.get('userId');
  if (!userId) {
    return c.json({ message: "userId is required" }, HttpStatus.BAD_REQUEST);
  }

  const body = await c.req.parseBody();
  const file = body['image'] as File | null
  const title = body['title'] as string
  const price = Number(body['price'])

  console.log(file, title, price);

  const postImageRepository = new PostImageRepositoryLocal()

  const createPostRequestDto = new CreatePostRequestDto(title, price, userId, file);
  const createPostService = new CreatePostService(postRepository, postImageRepository);

  const result = await withTransaction(async () => {
    const result = await createPostService.execute(createPostRequestDto);
    return result;
  })

  return c.json(result, HttpStatus.CREATED);
})

post.post("/likes", async (c) => {
  const body = await c.req.json();
  const { userId, postId } = body;
  const likePostRequestDto = new LikePostRequestDto(postId, userId);
  const postLikeService = new PostLikeService(postRepository)
  await postLikeService.toggleLike(likePostRequestDto);
  return c.json({ message: "" }, HttpStatus.OK);
})

post.post("/comments", async (c) => {
  // ユーザーのコメントを作成する
  const userId = c.get('userId');
  const body = await c.req.json();
  const { postId, content } = body;

  if (!postId || !userId) {
    return c.json({ message: "postId, userId is required" }, HttpStatus.BAD_REQUEST);
  }

  const createCommentService = new CreateCommentService(postRepository);
  await createCommentService.execute(new CreateCommentRequestDto(postId, userId, content));

  return c.json({ message: "comment created" }, HttpStatus.CREATED);
});

// みんなの投稿
post.get("/", async (c) => {
  const userId: string | undefined = c.req.query('userId')
  const getAllPostWithUserService = new GetAllPostWithUserService(postQueryService, userQueryService);
  const results = await getAllPostWithUserService.execute(userId);
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

post.get("/users/:userId/history", async (c) => {
  const userId = c.req.param('userId')
  const startDateStr = c.req.query('startDate')
  const endDateStr = c.req.query('endDate')

  // ない場合は1年分
  const startDate = startDateStr ? new Date(startDateStr) : new Date((new Date().getFullYear() - 1));
  const endDate = endDateStr ? new Date(endDateStr) : new Date();

  const getUserPostHistoryService = new GetUserPostHistoryService(postQueryService)
  const results = await getUserPostHistoryService.execute(userId, startDate, endDate);
  return c.json(results, HttpStatus.OK);
});

post.delete("/", (c) => {
  return c.json({ message: "post deleted success" }, HttpStatus.OK);
});

export default post;
