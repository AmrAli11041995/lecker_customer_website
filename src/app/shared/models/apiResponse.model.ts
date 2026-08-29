export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data: T;
  statusCode: number;
  errors: string[];
}