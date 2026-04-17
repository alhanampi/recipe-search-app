import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const renderSearchBar = (props = {}) => render(<SearchBar {...props} />);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SearchBar', () => {
  it('renders the input and submit button', () => {
    renderSearchBar();
    expect(screen.getByPlaceholderText('search.placeholder')).toBeInTheDocument();
    expect(screen.getByLabelText('search.button')).toBeInTheDocument();
  });

  it('navigates to search route on submit', async () => {
    renderSearchBar();
    await userEvent.type(screen.getByPlaceholderText('search.placeholder'), 'pasta');
    await userEvent.click(screen.getByLabelText('search.button'));
    expect(mockNavigate).toHaveBeenCalledWith('/search/pasta');
  });

  it('does not navigate when query is empty', async () => {
    renderSearchBar();
    await userEvent.click(screen.getByLabelText('search.button'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate when query is only whitespace', async () => {
    renderSearchBar();
    await userEvent.type(screen.getByPlaceholderText('search.placeholder'), '   ');
    await userEvent.click(screen.getByLabelText('search.button'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('encodes special characters in the search query', async () => {
    renderSearchBar();
    await userEvent.type(screen.getByPlaceholderText('search.placeholder'), 'mac & cheese');
    await userEvent.click(screen.getByLabelText('search.button'));
    expect(mockNavigate).toHaveBeenCalledWith('/search/mac%20%26%20cheese');
  });

  it('calls onSubmit after navigating', async () => {
    const onSubmit = vi.fn();
    renderSearchBar({ onSubmit });
    await userEvent.type(screen.getByPlaceholderText('search.placeholder'), 'pasta');
    await userEvent.click(screen.getByLabelText('search.button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('does not call onSubmit when query is empty', async () => {
    const onSubmit = vi.fn();
    renderSearchBar({ onSubmit });
    await userEvent.click(screen.getByLabelText('search.button'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
