import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestConsumer = () => {
  const { mode, toggle } = useTheme();
  return (
    <>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggle}>toggle</button>
    </>
  );
};

const renderWithProvider = () =>
  render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>
  );

beforeEach(() => {
  localStorage.clear();
  document.body.removeAttribute('data-theme');
});

describe('ThemeContext', () => {
  it('defaults to light mode when localStorage is empty', () => {
    renderWithProvider();
    expect(screen.getByTestId('mode').textContent).toBe('light');
  });

  it('reads initial mode from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    renderWithProvider();
    expect(screen.getByTestId('mode').textContent).toBe('dark');
  });

  it('toggles from light to dark', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('mode').textContent).toBe('dark');
  });

  it('toggles from dark back to light', async () => {
    localStorage.setItem('theme', 'dark');
    renderWithProvider();
    await userEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('mode').textContent).toBe('light');
  });

  it('persists mode to localStorage after toggle', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('toggle'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('sets data-theme attribute on body after toggle', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('toggle'));
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  });
});
