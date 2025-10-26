import type { LoginPayload, LoginResponse, UserRole } from '@/app/features/auth/types';
import { http } from '@/lib/api/http';

const buildMockUser = (role: UserRole): LoginResponse => ({
  user: {
    id: role === 'supplier' ? 'supp-1' : 'admin-1',
    name: role === 'supplier' ? 'Kano Specialist Hospital' : 'REG Platform Admin',
    email: role === 'supplier' ? 'ops@kanospecialist.ng' : 'admin@reg.ng',
    organization: role === 'supplier' ? 'Kano Specialist Hospital' : 'Regulatory HQ',
    role,
  },
  tokens: {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresAt: Date.now() + 1000 * 60 * 30,
  },
});

export const authApi = {
  async login(role: UserRole, payload: LoginPayload): Promise<LoginResponse> {
    try {
      return await http.post<LoginResponse>(`/auth/${role}/login`, payload);
    } catch (error) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(buildMockUser(role)), 600);
      });
    }
  },
};
