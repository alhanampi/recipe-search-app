import { render, screen } from '@testing-library/react';
import Footer from './Footer';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderFooter = () => render(<Footer />);

describe('Footer', () => {
  it('renders without crashing', () => {
    renderFooter();
  });

  it('displays the correct text', () => {
    renderFooter();
    expect(screen.getByText(/Pam @ 2026 with love/i)).toBeInTheDocument();
  });


  it('has an about link', () => {
    renderFooter();
    const aboutLink = screen.getByText(/footer.about/i);
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
