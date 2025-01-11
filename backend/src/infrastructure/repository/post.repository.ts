import { IPostRepository } from "../../domain/post/repository/post.repository";
import { Post } from "../../domain/post/entity/post.entity";
import { prisma } from "../prisma/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { transactionContext } from "../prisma/transactionContext";
import { Like } from "../../domain/post/entity/like.entity";
import { PostCountType } from "../../domain/post/types/postCountType";
import { calculateOneDayAgo, calculateOneWeekAgo } from "../../shared/utils/datetimeHelper";
import { UserId } from "../../domain/user/value_object";
import { PostId } from "../../domain/post/value_object";
import { Comment } from "../../domain/post/entity/comment.entity";


export class PostRepository implements IPostRepository {
  private getClient(): Prisma.TransactionClient | PrismaClient {
    return transactionContext.getStore() ?? prisma;
  }

  async create(post: Post): Promise<Post> {
    const client = this.getClient();
    const { id, title, price, userId, createAt, updatedAt } = await client.post.create({
      data: {
        id: post.getPostId().value,
        title: post.getTitle().value,
        price: post.getPrice().value,
        userId: post.getUserId().value,
      }
    });

    return Post.reConstruct(id, title, price, userId, createAt, updatedAt, []);
  }

  async findAll(): Promise<Post[]> {
    const client = this.getClient();
    const posts = await client.post.findMany({
      include: {
        likes: {
          select: {
            userId: true,
            postId: true
          }
        }
      },
      orderBy: { createAt: 'desc' }
    });

    return posts.map(post => {
      const likes = post.likes.map(like => new Like(new UserId(like.userId), new PostId(like.postId)));
      return Post.reConstruct(post.id, post.title, post.price, post.userId, post.createAt, post.updatedAt, likes);
    });
  }

  async countByUserIdAndType(userId: UserId, type: PostCountType): Promise<number> {
    const client = this.getClient();
    const startDate = this.getStartDate(type);

    return await client.post.count({
      where: {
        userId: userId.value,
        createAt: {
          gte: startDate
        }
      },
    });
  }

  async existsLikeByUserAndPost(like: Like): Promise<boolean> {
    const client = this.getClient();
    const postLike = await client.postLike.findFirst({
      where: {
        userId: like.getUserId().value,
        postId: like.getPostId().value,
      }
    });

    return !!postLike;
  }

  async createLike(newLike: Like): Promise<void> {
    const client = this.getClient();
    await client.postLike.create({
      data: {
        userId: newLike.getUserId().value,
        postId: newLike.getPostId().value,
      }
    });
  }

  async deleteLike(existingLike: Like): Promise<void> {
    const client = this.getClient();
    await client.postLike.delete({
      where: {
        postId_userId: {
          userId: existingLike.getUserId().value,
          postId: existingLike.getPostId().value,
        }
      }
    });
  }

  async createComment(comment: Comment): Promise<void> {
    const client = this.getClient();
    await client.postComment.create({
      data: {
        id: comment.getCommentId().value,
        postId: comment.getPostId().value,
        userId: comment.getUserId().value,
        content: comment.getContent().value,
      }
    });
  }

  private getStartDate(type: PostCountType): Date {
    return type === 'day'
      ? calculateOneDayAgo()
      : calculateOneWeekAgo();
  }
}
