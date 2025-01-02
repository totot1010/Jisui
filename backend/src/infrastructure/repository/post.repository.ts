import { IPostRepository } from "../../domain/post/repository/post.repository";
import { Post } from "../../domain/post/entity/post.entity";
import { prisma } from "../prisma/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { transactionContext } from "../prisma/transactionContext";


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
}
