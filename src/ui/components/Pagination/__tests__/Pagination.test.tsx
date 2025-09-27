import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Pagination from "../index";

describe("Pagination", () => {
  const onPrev = vi.fn();
  const onNext = vi.fn();

  beforeEach(() => {
    onPrev.mockReset();
    onNext.mockReset();
  });

  it("renders pagination metadata and button states", () => {
    render(
      <Pagination
        page={3}
        totalPages={8}
        hasPrev
        hasNext={false}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    expect(screen.getByText("Page 3 of 8")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /prev/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  it("invokes callbacks when buttons are pressed", async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        page={2}
        totalPages={5}
        hasPrev
        hasNext
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    await user.click(screen.getByRole("button", { name: /prev/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("ignores clicks when the controls are disabled", async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        page={1}
        totalPages={1}
        hasPrev={false}
        hasNext={false}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    await user.click(screen.getByRole("button", { name: /prev/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(onPrev).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("responds to keyboard navigation when focus is outside form fields", async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        page={4}
        totalPages={5}
        hasPrev
        hasNext
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    await user.keyboard("{ArrowLeft}{ArrowRight}");

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("does not handle arrow keys typed inside editable elements", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <input aria-label="filter" />
        <Pagination
          page={4}
          totalPages={5}
          hasPrev
          hasNext
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>
    );

    const input = screen.getByRole("textbox", { name: /filter/i });
    input.focus();

    await user.keyboard("{ArrowLeft}{ArrowRight}");

    expect(onPrev).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
  });
});
