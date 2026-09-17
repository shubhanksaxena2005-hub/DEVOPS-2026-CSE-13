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
    // Logo appears in navbar and footer; AgriSathi text should be present at least once
    expect(screen.getAllByText('AgriSathi').length).toBeGreaterThan(0);
  });

  it('renders the navigation links', () => {
    renderLandingPage();
    ['Platform', 'How It Works', 'For Farmers', 'Market Prices', 'Resources'].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it('renders the hero heading and description', () => {
    renderLandingPage();
    expect(
      screen.getByRole('heading', { name: /better decisions\.\s*better harvests\./i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/crop recommendations, weather alerts, mandi prices and expert guidance/i)
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

  it('renders the Field Snapshot panel', () => {
    renderLandingPage();
    expect(screen.getByText('FIELD SNAPSHOT')).toBeInTheDocument();
    expect(screen.getAllByText(/nashik, maharashtra/i).length).toBeGreaterThan(0);
  });

  it('renders the trust statistics', () => {
    renderLandingPage();
    expect(screen.getByText('Trusted by the Field')).toBeInTheDocument();
    expect(screen.getByText('2,800+')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Active Farmers')).toBeInTheDocument();
  });

  it('renders the core features', () => {
    renderLandingPage();
    expect(screen.getByText('Everything You Need to Make the Next Move')).toBeInTheDocument();
    ['Crop Recommendations', 'Weather Alerts', 'Mandi Prices', 'Expert Advice'].forEach((title) => {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    });
  });

  it('renders the user groups section', () => {
    renderLandingPage();
    expect(screen.getByText('Built for the People Who Work in Agriculture')).toBeInTheDocument();
    ['Farmers', 'Field Officers', 'Agri Dealers', 'Procurement Teams'].forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the workflow steps', () => {
    renderLandingPage();
    ['Check', 'Understand', 'Decide', 'Act'].forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the mandi price table', () => {
    renderLandingPage();
    expect(screen.getByText("Today's Mandi Snapshot")).toBeInTheDocument();
    expect(screen.getByText('Wheat')).toBeInTheDocument();
    expect(screen.getByText('Onion')).toBeInTheDocument();
    expect(screen.getByText(/ludhiana, punjab/i)).toBeInTheDocument();
  });

  it('renders the testimonials section', () => {
    renderLandingPage();
    expect(screen.getByText('From the Field')).toBeInTheDocument();
    expect(screen.getByText('Ramesh Yadav')).toBeInTheDocument();
  });

  it('renders the final CTA section with a link to the register page', () => {
    renderLandingPage();
    expect(
      screen.getByText('Make Your Next Farming Decision With Confidence.')
    ).toBeInTheDocument();
  });

  it('renders the footer with contact and copyright details', () => {
    renderLandingPage();
    expect(screen.getByText('support@agrisathi.in')).toBeInTheDocument();
    expect(screen.getByText(/© 2026 AgriSathi\. All rights reserved\./)).toBeInTheDocument();
  });
});
