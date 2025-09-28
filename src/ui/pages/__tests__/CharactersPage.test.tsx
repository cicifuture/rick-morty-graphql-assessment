import { fireEvent, render, screen } from "@testing-library/react";
import type { Character } from "@/services/characters/characters.type";
import type { CharactersViewModel } from "@/ui/viewModel/characters.viewModel";
import { beforeEach, describe, expect, it, vi } from "vitest";

const renderedCharacters: Character[] = [];
type PaginationMockProps = {
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};
let lastPaginationProps: PaginationMockProps | undefined;

vi.mock("@/ui/components/CharacterCard", () => ({
  default: ({ character }: { character: Character }) => {
    renderedCharacters.push(character);
    return <div data-testid="character-card">{character.name}</div>;
  },
}));

vi.mock("@/ui/components/Pagination", () => ({
  default: (props: PaginationMockProps) => {
    lastPaginationProps = props;
    return (
      <div data-testid="pagination">
        <span>
          Page {props.page} of {props.totalPages}
        </span>
        <button onClick={props.onPrev}>Prev</button>
        <button onClick={props.onNext}>Next</button>
      </div>
    );
  },
}));

vi.mock("@/ui/viewModel/characters.viewModel", () => ({
  useCharactersViewModel: vi.fn(),
}));

import CharactersPage from "../CharactersPage";
import { useCharactersViewModel } from "@/ui/viewModel/characters.viewModel";

const mockUseCharactersViewModel = vi.mocked(useCharactersViewModel);

const createViewModel = (
  overrides: Partial<CharactersViewModel> = {}
): CharactersViewModel => ({
  page: 1,
  items: [],
  totalPages: 1,
  canPrev: false,
  canNext: false,
  loading: false,
  error: undefined,
  retry: vi.fn(),
  goNext: vi.fn(),
  goPrev: vi.fn(),
  ...overrides,
});

beforeEach(() => {
  renderedCharacters.length = 0;
  lastPaginationProps = undefined;
  mockUseCharactersViewModel.mockReset();
});

describe("CharactersPage", () => {
  it("renders the loading state while data is fetching", () => {
    mockUseCharactersViewModel.mockReturnValue(
      createViewModel({ loading: true })
    );

    render(<CharactersPage />);

    expect(screen.getByText(/loading characters/i)).toBeInTheDocument();
    expect(renderedCharacters).toHaveLength(0);
    expect(lastPaginationProps).toBeUndefined();
  });

  it("renders the error state and retries when requested", () => {
    const retry = vi.fn();
    mockUseCharactersViewModel.mockReturnValue(
      createViewModel({
        error: new Error("boom"),
        retry,
      })
    );

    render(<CharactersPage />);

    expect(screen.getByText("Error loading characters.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("renders character cards and pagination when data is available", () => {
    const goNext = vi.fn();
    const goPrev = vi.fn();
    const characters: Character[] = [
      {
        id: "1",
        name: "Rick Sanchez",
        species: "Human",
        imageUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: "2",
        name: "Morty Smith",
        species: "Human",
        imageUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    ];

    mockUseCharactersViewModel.mockReturnValue(
      createViewModel({
        page: 2,
        totalPages: 5,
        canPrev: true,
        canNext: true,
        items: characters,
        goNext,
        goPrev,
      })
    );

    render(<CharactersPage />);

    expect(renderedCharacters).toHaveLength(characters.length);
    expect(screen.getAllByTestId("character-card")).toHaveLength(
      characters.length
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    fireEvent.click(screen.getByRole("button", { name: /prev/i }));
    expect(goNext).toHaveBeenCalledTimes(1);
    expect(goPrev).toHaveBeenCalledTimes(1);
    expect(lastPaginationProps).toMatchObject({
      hasPrev: true,
      hasNext: true,
      onNext: goNext,
      onPrev: goPrev,
    });
  });

  it("renders the empty state when there are no characters", () => {
    mockUseCharactersViewModel.mockReturnValue(createViewModel());

    render(<CharactersPage />);

    expect(screen.getByText("No characters found.")).toBeInTheDocument();
    expect(renderedCharacters).toHaveLength(0);
  });
});
