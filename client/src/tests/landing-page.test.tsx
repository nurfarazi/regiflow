import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from '@/app/routes/landing-page';

describe('LandingPage', () => {
  it('renders entry points', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Supplier Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/REG Admin Portal/i)).toBeInTheDocument();
  });
});
