import { ValidationError } from "../../../shared/exceptions/validationError";

export class CommentContent {
  private readonly __value: string;

  constructor(value: string) {
    this.__validate(value);
    this.__value = value;
  }

  private __validate(value: string) {
    if (value.length === 0) {
      throw new ValidationError("コメントを入力してください");
    }

    if (value.length > 255) {
      throw new ValidationError("コメントは255文字以内で入力してください");
    }
  }

  get value(): string {
    return this.__value;
  }
}
