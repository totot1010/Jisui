import { Comment } from "../../../domain/post/entity/comment.entity";
import { IPostRepository } from "../../../domain/post/repository/post.repository";
import { CommentContent, CommentId, PostId } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";
import { CreateCommentRequestDto } from "../dto/createComment.dto";


export class CreateCommentService {
  constructor(private postRepository: IPostRepository) { }

  async execute(createCommentRequestDto: CreateCommentRequestDto): Promise<void> {
    const { postId, userId, content } = createCommentRequestDto;
    const comment = new Comment(
      CommentId.generate(),
      new PostId(postId),
      new UserId(userId),
      new CommentContent(content),
      new Date(),
      undefined,
    );
    await this.postRepository.createComment(comment);
  }
}
