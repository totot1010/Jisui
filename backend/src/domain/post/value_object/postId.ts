import { v4 as uuidv4 } from 'uuid';

export class PostId {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  public static generate(): PostId {
    return new PostId(uuidv4());
  }
};
