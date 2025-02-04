class CreatePostRequestDto {
  public readonly title: string;
  public readonly price: number;
  public readonly userId: string;
  public readonly file: File | null;

  constructor(title: string, price: number, userId: string, file: File | null) {
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.file = file;
  }
}


class CreatePostResponseDto {
  public readonly id: string;
  public readonly title: string;
  public readonly price: number;
  public readonly userId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly imageUrl: string | null;

  constructor(id: string, title: string, price: number, userId: string, createdAt: Date, updatedAt: Date, imageUrl: string | null) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.imageUrl = imageUrl;
  }
}

export { CreatePostRequestDto, CreatePostResponseDto };
