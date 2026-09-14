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

describe('LandingPage', () => {
  it('renders the navbar logo/brand name', () => {
    renderLandingPage();
    // Logo appears in navbar; AgriSathi text should be present at least once
    expect(screen.getAllByText('AgriSathi').length).toBeGreaterThan(0);
  });

  it('renders the hero heading and description', () => {
    renderLandingPage();
    expect(
      screen.getByRole('heading', { name: /grow more with smarter decisions/i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/crop recommendations, weather alerts, mandi prices and expert advice/i)
    ).toBeInTheDocument();
  });

  it('renders "Get Started" and "Login" call-to-action links pointing to the right routes', () => {
    renderLandingPage();
    const getStartedLinks = screen.getAllByRole('link', { name: /get started/i });
    expect(getStartedLinks.length).toBeGreaterThan(0);
    getStartedLinks.forEach((link) => expect(link).toHaveAttribute('href', '/register'));

    const loginLinks = screen.getAllByRole('link', { name: /^login$/i });
    expect(loginLinks.length).toBeGreaterThan(0);
    loginLinks.forEach((link) => expect(link).toHaveAttribute('href', '/login'));
  });

  it('renders all feature cards', () => {
    renderLandingPage();
    // Some feature titles are repeated in the footer links, so allow multiple matches.
    const featureTitles = [
      'Crop Recommendations',
      'Weather Updates',
      'Mandi Prices',
      'Disease Detection',
      'Fertilizer Guidance',
      'Government Schemes',
      'Crop Calendar',
      'Expense Tracking',
      'Expert Consultation',
    ];
    featureTitles.forEach((title) => {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    });
  });

  it('renders the "How It Works" steps', () => {
    renderLandingPage();
    expect(screen.getByText('Set Up Your Farm Profile')).toBeInTheDocument();
    expect(screen.getByText('Get Daily Farming Guidance')).toBeInTheDocument();
    expect(screen.getByText('Make Better Decisions')).toBeInTheDocument();
  });

  it('renders the benefits section', () => {
    renderLandingPage();
    expect(screen.getByText('Higher Yield')).toBeInTheDocument();
    expect(screen.getByText('Water Efficiency')).toBeInTheDocument();
    expect(screen.getByText('Risk Protection')).toBeInTheDocument();
    expect(screen.getByText('Better Prices')).toBeInTheDocument();
  });

  it('renders the CTA section with a link to the register page', () => {
    renderLandingPage();
    expect(screen.getByText('Start Farming Smarter Today')).toBeInTheDocument();
    const ctaLink = screen.getByRole('link', { name: /create your free account/i });
    expect(ctaLink).toHaveAttribute('href', '/register');
  });

  it('renders the footer with contact and copyright details', () => {
    renderLandingPage();
    expect(screen.getByText('support@agrisathi.in')).toBeInTheDocument();
    expect(screen.getByText(/© 2026 AgriSathi\. All rights reserved\./)).toBeInTheDocument();
  });
});
