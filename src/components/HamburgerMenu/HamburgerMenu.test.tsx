import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HamburgerMenu from './HamburgerMenu';

const mockChangeLanguage = vi.fn();
const mockToggle = vi.fn();
let mockMode = 'light';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      resolvedLanguage: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

vi.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ mode: mockMode, toggle: mockToggle }),
}));

vi.mock('../SearchBar/SearchBar', () => ({
  default: () => <div data-testid="search-bar" />,
}));

vi.mock('../../assets/11401354.png', () => ({ default: '' }));

const renderMenu = () => render(<HamburgerMenu />);

beforeEach(() => {
  mockMode = 'light';
  vi.clearAllMocks();
});

describe('HamburgerMenu', () => {
  it('renders without crashing', () => {
    renderMenu();
  });

  it('shows the hamburger icon when closed', () => {
    renderMenu();
    expect(screen.getByLabelText('menu')).toBeInTheDocument();
  });

  it('opens the overlay when menu button is clicked', async () => {
    renderMenu();
    const overlay = screen.getByLabelText('close menu').closest('[aria-hidden]');
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
    await userEvent.click(screen.getByLabelText('menu'));
    expect(overlay).toHaveAttribute('aria-hidden', 'false');
  });

  it('closes the overlay when close button is clicked', async () => {
    renderMenu();
    const overlay = screen.getByLabelText('close menu').closest('[aria-hidden]');
    await userEvent.click(screen.getByLabelText('menu'));
    await userEvent.click(screen.getByLabelText('close menu'));
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  it('closes the overlay when logo is clicked', async () => {
    renderMenu();
    const overlay = screen.getByLabelText('close menu').closest('[aria-hidden]');
    await userEvent.click(screen.getByLabelText('menu'));
    await userEvent.click(screen.getByAltText('logo'));
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows header.light label in light mode', async () => {
    renderMenu();
    await userEvent.click(screen.getByLabelText('menu'));
    expect(screen.getByText('header.light')).toBeInTheDocument();
  });

  it('shows header.dark label in dark mode', async () => {
    mockMode = 'dark';
    renderMenu();
    await userEvent.click(screen.getByLabelText('menu'));
    expect(screen.getByText('header.dark')).toBeInTheDocument();
  });

  it('calls changeLanguage when language selector changes', async () => {
    renderMenu();
    await userEvent.click(screen.getByLabelText('menu'));
    const select = document.querySelector(
      'input[aria-hidden]'
    ) as HTMLInputElement;
    fireEvent.change(select, { target: { value: 'es' } });
    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
  });

  it('renders the about link', async () => {
    renderMenu();
    await userEvent.click(screen.getByLabelText('menu'));
    const link = screen.getByText('footer.about');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders the search bar inside the overlay', async () => {
    renderMenu();
    await userEvent.click(screen.getByLabelText('menu'));
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
});
