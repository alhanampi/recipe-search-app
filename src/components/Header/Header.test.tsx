import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

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

vi.mock('../HamburgerMenu/HamburgerMenu', () => ({
  default: () => null,
}));

vi.mock('../../assets/11401354.png', () => ({ default: '' }));

const renderHeader = () => render(<Header />);

beforeEach(() => {
  mockMode = 'light';
  vi.clearAllMocks();
});

describe('Header', () => {
  it('renders without crashing', () => {
    renderHeader();
  });

  it('displays the site title', () => {
    renderHeader();
    expect(screen.getByText('header.title')).toBeInTheDocument();
  });

  it('calls changeLanguage when language selector changes', () => {
    renderHeader();
    const select = document.querySelector('input[aria-hidden]') as HTMLInputElement;
    fireEvent.change(select, { target: { value: 'fr' } });
    expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
  });

  it('renders the theme switch as checked in dark mode', () => {
    mockMode = 'dark';
    renderHeader();
    const switchInput = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(switchInput).toBeChecked();
  });
});
