import { PostId } from "../value_object";

export interface IPostImageRepository {
  upload(file: File, postId: PostId): Promise<string>;
  delete(postId: PostId): Promise<void>;
  getUrl(postId: PostId): Promise<string>;
}
