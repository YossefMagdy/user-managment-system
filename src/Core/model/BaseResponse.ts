export interface BaseResponse<T> {
  users: T;
  skip: number;
  total: number;
  limit: number;
}
