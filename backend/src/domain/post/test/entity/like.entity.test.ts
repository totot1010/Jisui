import { describe, expect, it } from "vitest";
import { PostId } from "../../value_object";
import { UserId } from "../../../user/value_object";
import { Like } from "../../entity/like.entity";

describe('LikeEntity', () => {
  it('インスタンス生成できること', () => {
    // given
    const userId = UserId.generate();
    const postId = PostId.generate();

    // when
    const like = new Like(userId, postId);

    // then
    expect(like.getUserId().value).toBe(userId.value);
    expect(like.getPostId().value).toBe(postId.value);
  });

  it('永続化層から取得したデータをエンティティに変換できること', () => {
    // given
    const postIdValue = '1234-5678-9012';
    const userIdValue = '1234-5678-9012';

    // when
    const like = Like.reConstruct(userIdValue, postIdValue);

    // then
    expect(like.getUserId().value).toBe(userIdValue);
    expect(like.getPostId().value).toBe(postIdValue);
  });


})
