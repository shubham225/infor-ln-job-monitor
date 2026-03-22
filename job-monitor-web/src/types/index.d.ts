export type BackendResponse<T> = {
  code: number;
  message: string;
  payload: T;
};