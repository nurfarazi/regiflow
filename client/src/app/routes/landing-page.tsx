import { Link } from 'react-router-dom';

export const LandingPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-slate-100">
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 text-center">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">RegiFlow</p>
        <h1 className="text-4xl font-bold text-slate-900">Unified supplier + REG admin workspace</h1>
        <p className="mx-auto max-w-2xl text-base text-slate-600">
          Capture staff data, validate submissions, and keep exports in sync across teams. Choose the portal that matches your role.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <LandingCard
          title="Supplier Portal"
          description="Secure workspace for hospitals and suppliers to submit, edit, and track REG records."
          badge="For facilities"
          to="/supplier/login"
        />
        <LandingCard
          title="REG Admin Portal"
          description="Queues, exports, and audit controls for Regulatory HQ analysts and reviewers."
          badge="For admins"
          to="/admin/login"
        />
      </div>
    </div>
  </div>
);

const LandingCard = ({ title, description, badge, to }: { title: string; description: string; badge: string; to: string }) => (
  <article className="rounded-3xl border border-slate-100 bg-white/80 p-8 text-left shadow-soft-card backdrop-blur">
    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">{badge}</span>
    <h2 className="mt-4 text-2xl font-bold text-slate-900">{title}</h2>
    <p className="mt-2 text-sm text-slate-600">{description}</p>
    <Link
      to={to}
      className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-soft-card transition hover:bg-primary-700"
    >
      Enter portal
    </Link>
  </article>
);
