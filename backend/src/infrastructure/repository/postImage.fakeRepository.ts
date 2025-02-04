import { IPostImageRepository } from "../../domain/post/repository/postImage.repository";
import { PostId } from "../../domain/post/value_object";

export class PostImageFakeRepository implements IPostImageRepository {
  async upload(file: File): Promise<string> {
    return 'https://example.com/image.jpg';
  }

  async delete(postId: PostId): Promise<void> {
    return;
  }

  async getUrl(postId: PostId): Promise<string> {
    return 'https://example.com/image.jpg';
  }
}
