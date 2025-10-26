import { useNavigate, useSearchParams } from 'react-router-dom';
import type { UserRole } from '@/app/features/auth/types';
import { LoginCard } from '@/app/features/auth/components/login-card';
import { authApi } from '@/lib/api/auth';
import { useAuth } from '@/app/hooks/use-auth';
import { toast } from '@/app/utils/toast-emitter';

export const LoginPage = ({ role }: { role: UserRole }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [params] = useSearchParams();
  const next = params.get('next');

  const handleSubmit = async (values: { email: string; password: string }) => {
    const response = await authApi.login(role, values);
    login(response);
    toast({ title: 'Welcome back', description: `You are now logged in as ${response.user.name}`, variant: 'success' });
    navigate(next ?? `/${role}/dashboard`, { replace: true });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-primary-50 via-white to-slate-100 px-4 py-10">
      <div className="text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">RegiFlow</p>
        <LoginCard role={role} onSubmit={handleSubmit} />
        <p className="mt-6 text-xs text-slate-500">
          Need access? Contact REG integrations support to be provisioned.
        </p>
      </div>
    </div>
  );
};
