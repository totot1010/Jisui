import { IPostRepository } from "../../domain/post/repository/post.repository";
import { Post } from "../../domain/post/entity/post.entity";
import { prisma } from "../prisma/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { transactionContext } from "../prisma/transactionContext";
import { UserId } from "../../domain/user/value_object";
import { PostId } from "../../domain/post/value_object";


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

    return Post.reConstruct(id, title, price, userId, createAt, updatedAt);
  }

  async findAll(): Promise<Post[]> {
    const client = this.getClient();
    const posts = await client.post.findMany(
      { orderBy: { createAt: 'desc' } }
    );

    return posts.map(post => {
      return Post.reConstruct(post.id, post.title, post.price, post.userId, post.createAt, post.updatedAt);
    });
  }

  async isExistsPostLikeByUserIdAndPostId(userId: UserId, postId: PostId): Promise<boolean> {
    const client = this.getClient();
    const postLike = await client.postLike.findFirst({
      where: {
        userId: userId.value,
        postId: postId.value,
      }
    });

    return !!postLike;
  }

  async like(userId: UserId, postId: PostId): Promise<void> {
    const client = this.getClient();
    await client.postLike.create({
      data: {
        userId: userId.value,
        postId: postId.value,
      }
    });
  }

  async unlike(userId: UserId, postId: PostId): Promise<void> {
    const client = this.getClient();
    await client.postLike.delete({
      where: {
        postId_userId: {
          userId: userId.value,
          postId: postId.value,
        }
      }
    });
  }
}
