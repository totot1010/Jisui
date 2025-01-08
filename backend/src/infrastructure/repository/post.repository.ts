import { IPostRepository } from "../../domain/post/repository/post.repository";
import { Post } from "../../domain/post/entity/post.entity";
import { prisma } from "../prisma/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { transactionContext } from "../prisma/transactionContext";
import { Like } from "../../domain/post/entity/like.entity";


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
}
