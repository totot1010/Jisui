export type PostCountType = 'day' | 'week';

export const isPostCountType = (value: any): value is PostCountType => {
  return value === 'day' || value === 'week';
}
