import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Pagination from '../index';

describe('Pagination', () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    onPageChange.mockReset();
    // jsdom missing scrollTo, stub it so the component can call it safely
    window.scrollTo = vi.fn();
  });

  it('renders pagination metadata and button states', () => {
    render(
      <Pagination
        page={3}
        totalPages={8}
        hasPrev
        hasNext={false}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText('Page 3 / 8')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /prev/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('invokes callbacks when buttons are pressed', async () => {
    const user = userEvent.setup();

    render(
      <Pagination page={2} totalPages={5} hasPrev hasNext onPageChange={onPageChange} />
    );

    await user.click(screen.getByRole('button', { name: /prev/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
  });

  it('ignores clicks when the controls are disabled', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        page={1}
        totalPages={1}
        hasPrev={false}
        hasNext={false}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByRole('button', { name: /prev/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('responds to keyboard navigation when focus is outside form fields', async () => {
    const user = userEvent.setup();

    render(
      <Pagination page={4} totalPages={5} hasPrev hasNext onPageChange={onPageChange} />
    );

    await user.keyboard('{ArrowLeft}{ArrowRight}');

    expect(onPageChange).toHaveBeenNthCalledWith(1, 3);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 5);
  });

  it('does not handle arrow keys typed inside editable elements', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <input aria-label="filter" />
        <Pagination page={4} totalPages={5} hasPrev hasNext onPageChange={onPageChange} />
      </div>
    );

    const input = screen.getByRole('textbox', { name: /filter/i });
    input.focus();

    await user.keyboard('{ArrowLeft}{ArrowRight}');

    expect(onPageChange).not.toHaveBeenCalled();
  });
});
