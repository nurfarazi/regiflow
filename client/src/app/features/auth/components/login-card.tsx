import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import type { UserRole } from '@/app/features/auth/types';

const schema = z.object({
  email: z.string().email('Provide a valid work email'),
  password: z.string().min(6, 'Password is required'),
});

type LoginFields = z.infer<typeof schema>;

type LoginCardProps = {
  role: UserRole;
  onSubmit: (values: LoginFields) => Promise<void>;
  isLoading?: boolean;
};

export const LoginCard = ({ role, onSubmit, isLoading }: LoginCardProps) => {
  const form = useForm<LoginFields>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-soft-card"
    >
      <div className="mb-8 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">{role} portal</p>
        <h2 className="text-2xl font-bold text-slate-900">Sign in to RegiFlow</h2>
        <p className="text-sm text-slate-500">
          Use the credentials issued by REG to reach your {role === 'supplier' ? 'supplier workspace' : 'admin console'}.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Work email"
          placeholder="you@organization.ng"
          type="email"
          autoComplete="email"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          type="password"
          autoComplete="current-password"
          {...form.register('password')}
          error={form.formState.errors.password?.message}
        />
        <Button type="submit" className="mt-2 w-full" isLoading={isLoading}>
          Access portal
        </Button>
      </div>
    </form>
  );
};
