import { PrismaClient } from "@prisma/client";
import { IPostRepository } from "../../domain/post/repository/post.repository";
import { Post } from "../../domain/post/entity/post.entity";


export class PostRepository implements IPostRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany(
      { orderBy: { createAt: 'desc' } }
    );

    return posts.map(post => {
      return Post.reConstruct(post.id, post.title, post.price, post.userId, post.createAt, post.updatedAt);
    });
  }
}