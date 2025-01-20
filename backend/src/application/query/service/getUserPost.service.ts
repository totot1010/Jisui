import { Post } from "../../../domain/post/entity/post.entity";
import { User } from "../../../domain/user/entity/user.entity";
import { PostQueryService } from "../../post/service/postQuery.service";
import { UserQueryService } from "../../user/service/userQuery.service";
import { GetUserPostRequestDto, GetUserPostResponseDto, PostCommentDto } from "../dto/getUserPost.dto";

export class GetUserPostService {
  constructor(
    private readonly postQueryService: PostQueryService,
    private readonly userQueryService: UserQueryService
  ) { }

  public async getAllPostByUser(getUserPostRequestDto: GetUserPostRequestDto): Promise<GetUserPostResponseDto[]> {
    const userId: string = getUserPostRequestDto.userId;
    const posts: Post[] = await this.postQueryService.findAllByUserId(userId);
    const users: User[] = await this.userQueryService.findAll();

    const result: GetUserPostResponseDto[] = [];
    const user = users.find((user) => user.getUserId().value === userId);
    if (!user) {
      throw new Error("ユーザーが見つかりませんでした");
    }

    for (const post of posts) {
      result.push(new GetUserPostResponseDto(
        post.getPostId().value,
        post.getTitle().value,
        post.getPrice().value,
        post.getUserId().value,
        user.getUsername().value,
        post.getCreatedAt(),
        post.getUpdatedAt(),
        post.getLikes().map(like => like.getUserId().value),
        this.getComments(post, users)
      ));
    }

    return result;
  }

  public async getAllPost(): Promise<GetUserPostResponseDto[]> {
    const posts: Post[] = await this.postQueryService.findAll();
    const users: User[] = await this.userQueryService.findAll();

    const result: GetUserPostResponseDto[] = [];
    for (const post of posts) {
      const user = users.find((user) => user.getUserId().value === post.getUserId().value);
      if (!user) {
        throw new Error("ユーザーが見つかりませんでした");
      }
      result.push(new GetUserPostResponseDto(
        post.getPostId().value,
        post.getTitle().value,
        post.getPrice().value,
        post.getUserId().value,
        user.getUsername().value,
        post.getCreatedAt(),
        post.getUpdatedAt(),
        post.getLikes().map(like => like.getUserId().value),
        this.getComments(post, users)
      ));
    }
    return result;
  }

  private getComments(post: Post, users: User[]): PostCommentDto[] {
    return post.getComments().map(comment => {
      const user = users.find(user => user.getUserId().value === comment.getUserId().value);
      if (!user) {
        throw new Error("ユーザーが見つかりませんでした");
      }
      return {
        id: comment.getCommentId().value,
        userId: comment.getUserId().value,
        username: user.getUsername().value,
        content: comment.getContent().value,
        createdAt: comment.getCreatedAt(),
        updatedAt: comment.getUpdatedAt(),
      };
    });
  }
}
