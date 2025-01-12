import { describe, expect, it } from "vitest";
import { PostId, Price, Title } from "../../value_object";
import { UserId } from "../../../user/value_object";
import { Post } from "../../entity/post.entity";
import { Like } from "../../entity/like.entity";

describe('PostEntity', () => {
  it('インスタンス生成できること', () => {
    // given
    const postId = PostId.generate();
    const title = new Title('title');
    const price = new Price(1000);
    const userId = UserId.generate();
    const createdAt = new Date();
    const updatedAt = new Date();
    const likes = [new Like(userId, postId)];

    // when
    const post = new Post(postId, title, price, userId, createdAt, updatedAt, likes);

    // then
    expect(post.getPostId().value).toBe(postId.value);
    expect(post.getTitle().value).toBe(title.value);
    expect(post.getPrice().value).toBe(price.value);
    expect(post.getUserId().value).toBe(userId.value);
    expect(post.getcreatedAt()).toBe(createdAt);
    expect(post.getUpdatedAt()).toBe(updatedAt);
    expect(post.getLikes()).toBe(likes);
  });

  it('永続化層から取得したデータをエンティティに変換できること', () => {
    // given
    const postIdValue = PostId.generate().value;
    const titleValue = 'title';
    const priceValue = 1000;
    const userIdValue = UserId.generate().value;
    const createdAt = new Date();
    const updatedAt = new Date();
    const likes = [new Like(new UserId(userIdValue), new PostId(postIdValue))];

    // when
    const post = Post.reConstruct(postIdValue, titleValue, priceValue, userIdValue, createdAt, updatedAt, likes);

    // then
    expect(post.getPostId().value).toBe(postIdValue);
    expect(post.getTitle().value).toBe(titleValue);
    expect(post.getPrice().value).toBe(priceValue);
    expect(post.getUserId().value).toBe(userIdValue);
    expect(post.getcreatedAt()).toBe(createdAt);
    expect(post.getUpdatedAt()).toBe(updatedAt);
    expect(post.getLikes()).toBe(likes);
  });


})
