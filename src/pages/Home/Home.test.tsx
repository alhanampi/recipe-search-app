import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

vi.mock('../../components/SearchBar/SearchBar', () => ({ default: () => <div data-testid="search-bar" /> }));
vi.mock('../../components/Category/Category', () => ({ default: () => <div data-testid="category" /> }));
vi.mock('../../components/TopPicks/TopPicks', () => ({ default: () => <div data-testid="top-picks" /> }));
vi.mock('../../components/VeggiePicks/VeggiePicks', () => ({ default: () => <div data-testid="veggie-picks" /> }));

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe('Home', () => {
  it('renders without crashing', () => {
    renderHome();
  });

  it('renders the search bar', () => {
    renderHome();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('renders the category section', () => {
    renderHome();
    expect(screen.getByTestId('category')).toBeInTheDocument();
  });

  it('renders the top picks section', () => {
    renderHome();
    expect(screen.getByTestId('top-picks')).toBeInTheDocument();
  });

  it('renders the veggie picks section', () => {
    renderHome();
    expect(screen.getByTestId('veggie-picks')).toBeInTheDocument();
  });
});
