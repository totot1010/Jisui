class CreatePostRequestDto {
  public readonly title: string;
  public readonly price: number;
  public readonly userId: string;

  constructor(title: string, price: number, userId: string) {
    this.title = title;
    this.price = price;
    this.userId = userId;
  }
}


class CreatePostResponseDto {
  public readonly id: string;
  public readonly title: string;
  public readonly price: number;
  public readonly userId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(id: string, title: string, price: number, userId: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { CreatePostRequestDto, CreatePostResponseDto };
