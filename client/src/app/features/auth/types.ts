export type UserRole = 'supplier' | 'admin';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  organization?: string;
  role: UserRole;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};
