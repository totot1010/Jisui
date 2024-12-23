import { describe, expect, it } from "vitest";
import { PostId, Price, Title } from "../../value_object";
import { UserId } from "../../../user/value_object";
import { Post } from "../../entity/post.entity";

describe('PostEntity', () => {
  it('インスタンス生成できること', () => {
    // given
    const postId = PostId.generate();
    const title = new Title('title');
    const price = new Price(1000);
    const userId = UserId.generate();
    const createAt = new Date();
    const updatedAt = new Date();

    // when
    const post = new Post(postId, title, price, userId, createAt, updatedAt);

    // then
    expect(post.getPostId().value).toBe(postId.value);
    expect(post.getTitle().value).toBe(title.value);
    expect(post.getPrice().value).toBe(price.value);
    expect(post.getUserId().value).toBe(userId.value);
    expect(post.getCreateAt()).toBe(createAt);
    expect(post.getUpdatedAt()).toBe(updatedAt);
  });

  it('永続化層から取得したデータをエンティティに変換できること', () => {
    // given
    const postIdValue = '1234-5678-9012';
    const titleValue = 'title';
    const priceValue = 1000;
    const userIdValue = '1234-5678-9012';
    const createAt = new Date();
    const updatedAt = new Date();

    // when
    const post = Post.reConstruct(postIdValue, titleValue, priceValue, userIdValue, createAt, updatedAt);

    // then
    expect(post.getPostId().value).toBe(postIdValue);
    expect(post.getTitle().value).toBe(titleValue);
    expect(post.getPrice().value).toBe(priceValue);
    expect(post.getUserId().value).toBe(userIdValue);
    expect(post.getCreateAt()).toBe(createAt);
    expect(post.getUpdatedAt()).toBe(updatedAt);
  });


})
