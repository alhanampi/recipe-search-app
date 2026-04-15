import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { returnObjects?: boolean }) => {
      if (opts?.returnObjects) {
        if (key === 'about.stackItems') return ['React 19 — core framework'];
        if (key === 'about.structureItems') return ['Plain item without dash'];
        return [];
      }
      return key;
    },
  }),
}));

const renderAboutPage = () =>
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  );

describe('AboutPage', () => {
  it('renders without crashing', () => {
    renderAboutPage();
  });

  it('renders the page title', () => {
    renderAboutPage();
    expect(screen.getByText('about.title')).toBeInTheDocument();
  });

  it('renders all section titles', () => {
    renderAboutPage();
    expect(screen.getByText('about.stackTitle')).toBeInTheDocument();
    expect(screen.getByText('about.structureTitle')).toBeInTheDocument();
    expect(screen.getByText('about.translationTitle')).toBeInTheDocument();
    expect(screen.getByText('about.authorTitle')).toBeInTheDocument();
  });

  it('renders stack items', () => {
    renderAboutPage();
    expect(screen.getByText('React 19')).toBeInTheDocument();
  });

  it('bolds the part before the dash in list items', () => {
    renderAboutPage();
    const bold = screen.getByText('React 19');
    expect(bold.tagName).toBe('STRONG');
  });

  it('renders plain items without bold', () => {
    renderAboutPage();
    expect(screen.getByText('Plain item without dash')).toBeInTheDocument();
  });
});