import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Category from './Category';
import { CUISINE_ICONS } from '../../utils/constants';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string }) =>
      opts?.defaultValue ?? key,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const TOTAL_CUISINES = Object.keys(CUISINE_ICONS).length;
const VISIBLE_COUNT = 4;

const renderCategory = () => render(<Category />);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Category', () => {
  it('renders the section title', () => {
    renderCategory();
    expect(screen.getByText('category.title')).toBeInTheDocument();
  });

  it(`shows only ${VISIBLE_COUNT} cuisines initially`, () => {
    renderCategory();
    const buttons = screen.getAllByRole('button');
    // subtract 1 for the ShowAllButton
    expect(buttons.length - 1).toBe(VISIBLE_COUNT);
  });

  it('shows the "show all" button initially', () => {
    renderCategory();
    expect(screen.getByText('category.showAll')).toBeInTheDocument();
  });

  it('expands to all cuisines after clicking show all', async () => {
    renderCategory();
    await userEvent.click(screen.getByText('category.showAll'));
    const buttons = screen.getAllByRole('button');
    expect(buttons.length - 1).toBe(TOTAL_CUISINES);
  });

  it('changes button text to "show less" after expanding', async () => {
    renderCategory();
    await userEvent.click(screen.getByText('category.showAll'));
    expect(screen.getByText('category.showLess')).toBeInTheDocument();
  });

  it('collapses back to initial count after clicking show less', async () => {
    renderCategory();
    await userEvent.click(screen.getByText('category.showAll'));
    await userEvent.click(screen.getByText('category.showLess'));
    const buttons = screen.getAllByRole('button');
    expect(buttons.length - 1).toBe(VISIBLE_COUNT);
  });

  it('navigates to the cuisine route when a cuisine button is clicked', async () => {
    renderCategory();
    const cuisineButtons = screen
      .getAllByRole('button')
      .slice(0, VISIBLE_COUNT);
    await userEvent.click(cuisineButtons[0]);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(expect.stringMatching(/^\/\w/));
  });
});
