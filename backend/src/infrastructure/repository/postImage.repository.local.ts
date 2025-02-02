import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import { IPostImageRepository } from "../../domain/post/repository/postImage.repository";
import { Prisma, PrismaClient } from "@prisma/client";
import { transactionContext } from "../prisma/transactionContext";
import { prisma } from "../prisma/prisma";
import { PostId } from "../../domain/post/value_object";

export class PostImageRepositoryLocal implements IPostImageRepository {
  /*
  ローカルでファイルを保存する
  ファイルの保存先はupload/postImage/
  */
  private readonly uploadDir = "upload/postImage";

  private getClient(): Prisma.TransactionClient | PrismaClient {
    return transactionContext.getStore() ?? prisma;
  }

  private ensureUploadDirectoryExists(): void {
    /*
    ファイルの保存先のディレクトリが存在しない場合は作成する
    */
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  private getFileExtension(file: File): string {
    const fileName = file.name;
    const ext = path.extname(fileName);
    return ext || '.jpg'; // デフォルトの拡張子として.jpgを使用
  }

  async upload(file: File, postId: PostId): Promise<string> {
    this.ensureUploadDirectoryExists();

    const id = v4();
    const ext = this.getFileExtension(file);
    const filePath = path.join(this.uploadDir, `${id}${ext}`);
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // データベースに保存
    const client = this.getClient();
    await client.postImage.create({
      data: {
        id: id,
        url: filePath,
        postId: postId.value,
      }
    });

    return filePath;
  }

  async delete(postId: PostId): Promise<void> {
    return;
  }

  async getUrl(postId: PostId): Promise<string> {
    const client = this.getClient();
    const postImage = await client.postImage.findFirst({
      where: {
        postId: postId.value,
      }
    });
    return postImage?.url ?? '';
  }
}
