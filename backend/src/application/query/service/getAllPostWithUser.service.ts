import { Post } from "../../../domain/post/entity/post.entity";
import { User } from "../../../domain/user/entity/user.entity";
import { PostQueryService } from "../../post/service/postQuery.service";
import { UserQueryService } from "../../user/service/UserQuery.service";
import { getAllPostWithUserDto } from "../dto/getAllPostWithUser.dto";

export class GetAllPostWithUserService {
  constructor(
    private readonly postQueryService: PostQueryService,
    private readonly userQueryService: UserQueryService
  ) { }

  public async execute(): Promise<getAllPostWithUserDto[]> {
    const posts: Post[] = await this.postQueryService.findAll();
    const users: User[] = await this.userQueryService.findAll();

    const result: getAllPostWithUserDto[] = [];

    for (const post of posts) {
      const user = users.find((user) => user.getUserId().value === post.getUserId().value);
      if (!user) {
        throw new Error("ユーザーが見つかりませんでした");
      }
      result.push(new getAllPostWithUserDto(
        post.getPostId().value,
        post.getTitle().value,
        post.getPrice().value,
        post.getUserId().value,
        user.getUsername().value,
        post.getCreateAt(),
        post.getUpdatedAt()
      ));
    }

    return result;
  }
}
