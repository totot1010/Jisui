class UserPostHistoryDto {
  public readonly date: Date
  public readonly count: number

  constructor(date: Date, count: number) {
    this.date = date;
    this.count = count;
  }
}

class getUserPostHistoryResponseDto {
  public readonly userPostHistory: UserPostHistoryDto[]

  constructor(userPostHistory: UserPostHistoryDto[]) {
    this.userPostHistory = userPostHistory;
  }
};

export { getUserPostHistoryResponseDto, UserPostHistoryDto };
