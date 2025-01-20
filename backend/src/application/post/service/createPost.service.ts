import { Post } from "../../../domain/post/entity/post.entity";
import { IPostRepository } from "../../../domain/post/repository/post.repository";
import { PostId, Price, Title } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";
import { CreatePostRequestDto, CreatePostResponseDto } from "../dto/createPost.dto";

export class CreatePostService {
  constructor(private postRepository: IPostRepository) { }

  async execute(createPostRequestDto: CreatePostRequestDto): Promise<CreatePostResponseDto> {
    const { title, price, userId } = createPostRequestDto;
    const post = new Post(
      PostId.generate(),
      new Title(title),
      new Price(price),
      new UserId(userId),
      new Date(),
      new Date(),
      [],
      []
    );

    const result = await this.postRepository.create(post);

    return new CreatePostResponseDto(
      result.getPostId().value,
      result.getTitle().value,
      result.getPrice().value,
      result.getUserId().value,
      result.getCreatedAt(),
      result.getUpdatedAt()
    );
  }
}
