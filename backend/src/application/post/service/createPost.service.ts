import { Post } from "../../../domain/post/entity/post.entity";
import { IPostRepository } from "../../../domain/post/repository/post.repository";
import { IPostImageRepository } from "../../../domain/post/repository/postImage.repository";
import { PostId, Price, Title } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";
import { ITransactionManager } from "../../transaction/transactionManager";
import { CreatePostRequestDto, CreatePostResponseDto } from "../dto/createPost.dto";

export class CreatePostService {
  constructor(private postRepository: IPostRepository, private postImageRepository: IPostImageRepository, private transactionManager: ITransactionManager) { }

  async execute(createPostRequestDto: CreatePostRequestDto): Promise<CreatePostResponseDto> {
    const { title, price, userId, file } = createPostRequestDto;
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

    const { result, imageUrl } = await this.transactionManager.run(async () => {
      const result = await this.postRepository.create(post);
      const imageUrl = file ? await this.postImageRepository.upload(file, result.getPostId()) : null;
      return { result, imageUrl };
    });

    return new CreatePostResponseDto(
      result.getPostId().value,
      result.getTitle().value,
      result.getPrice().value,
      result.getUserId().value,
      result.getCreatedAt(),
      result.getUpdatedAt(),
      imageUrl
    );
  }
}
