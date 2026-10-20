import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

function renderLandingPage() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
}

const realFeatures = ['Secure Account', 'Farm Dashboard', 'My Farm', 'Expense Tracker', 'Activity Journal', 'Profile'];

describe('LandingPage', () => {
  it('renders the brand name', () => {
    renderLandingPage();
    expect(screen.getAllByText('AgriSathi').length).toBeGreaterThan(0);
  });

  it('renders only the navigation links for sections that exist', () => {
    renderLandingPage();
    expect(screen.getAllByText('Features').length).toBeGreaterThan(0);
    expect(screen.getAllByText('How It Works').length).toBeGreaterThan(0);
    ['Market Prices', 'Resources', 'For Farmers'].forEach((label) => {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    });
  });

  it('renders the hero heading and description', () => {
    renderLandingPage();
    expect(
      screen.getByRole('heading', { name: /keep your farm records\s*in one place\./i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/track every rupee you spend/i)).toBeInTheDocument();
  });

  it('renders "Get Started" and "Login" links pointing to the right routes', () => {
    renderLandingPage();
    const getStartedLinks = screen.getAllByRole('link', { name: /get started/i });
    expect(getStartedLinks.length).toBeGreaterThan(0);
    getStartedLinks.forEach((link) => expect(link).toHaveAttribute('href', '/register'));

    const loginLinks = screen.getAllByRole('link', { name: /^login$/i });
    expect(loginLinks.length).toBeGreaterThan(0);
    loginLinks.forEach((link) => expect(link).toHaveAttribute('href', '/login'));
  });

  it('lists every real feature', () => {
    renderLandingPage();
    realFeatures.forEach((title) => {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    });
  });

  it('does not advertise features the app does not have', () => {
    renderLandingPage();
    [/crop recommendation/i, /weather/i, /mandi/i, /expert advice/i, /disease/i, /government scheme/i].forEach((text) => {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });
  });

  it('does not show made-up statistics or testimonials', () => {
    renderLandingPage();
    expect(screen.queryByText('2,800+')).not.toBeInTheDocument();
    expect(screen.queryByText('From the Field')).not.toBeInTheDocument();
  });

  it('renders the how-it-works steps', () => {
    renderLandingPage();
    ['Create your account', 'Add your farm', 'Record as you work', 'Track your totals'].forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the footer', () => {
    renderLandingPage();
    expect(screen.getByText('© 2026 AgriSathi')).toBeInTheDocument();
  });
});
