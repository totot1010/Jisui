import { PostQueryService } from "./postQuery.service";
import { getUserPostHistoryResponseDto, UserPostHistoryDto } from "../dto/getUserPostHistory.dto";

export class GetUserPostHistoryService {
  constructor(
    private readonly postQueryService: PostQueryService
  ) { }

  public async execute(userId: string, startDate: Date, endDate: Date): Promise<getUserPostHistoryResponseDto> {
    const posts = await this.postQueryService.findAll(userId, startDate, endDate)

    // 投稿日時でMapを作成
    const postMap = new Map<string, number>();

    // startDateからendDateまでの日付をMapに格納
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      postMap.set(date.toISOString().split('T')[0], 0);
    }

    // 投稿日時でMapに格納
    for (const post of posts) {
      postMap.set(post.getCreatedAt().toISOString().split('T')[0], (postMap.get(post.getCreatedAt().toISOString().split('T')[0]) ?? 0) + 1);
    }

    // Mapを配列に変換
    const result = [...postMap].map(([date, count]) =>
      new UserPostHistoryDto(new Date(date), count)
    );

    return new getUserPostHistoryResponseDto(result);
  }
}
