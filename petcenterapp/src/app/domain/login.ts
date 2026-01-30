export interface LoginResponse {
  message: string;
  id: number;
  role: 'OWNER' | 'EMPLOYEE';
}
