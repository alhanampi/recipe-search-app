import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';

vi.mock('../Home/Home', () => ({ default: () => <div data-testid="home" /> }));
vi.mock('../../components/Header/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('../../components/Footer/Footer', () => ({ default: () => <footer data-testid="footer" /> }));

const renderMainPage = () =>
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  );

describe('MainPage', () => {
  it('renders without crashing', () => {
    renderMainPage();
  });

  it('renders the header', () => {
    renderMainPage();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders the main content', () => {
    renderMainPage();
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    renderMainPage();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
