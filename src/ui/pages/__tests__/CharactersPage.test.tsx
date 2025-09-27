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
  onPageChange: (page: number) => void;
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
          Page {props.page} / {props.totalPages}
        </span>
        <button onClick={() => props.onPageChange(props.page + 1)}>
          Trigger change
        </button>
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
  goToPage: vi.fn(),
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
    const goToPage = vi.fn();
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
        goToPage,
      })
    );

    render(<CharactersPage />);

    expect(renderedCharacters).toHaveLength(characters.length);
    expect(screen.getAllByTestId("character-card")).toHaveLength(
      characters.length
    );
    expect(screen.getByText("Page 2 / 5")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /trigger change/i }));
    expect(goToPage).toHaveBeenCalledWith(3);
    expect(lastPaginationProps).toMatchObject({
      hasPrev: true,
      hasNext: true,
    });
  });

  it("returns null when there are no characters to render", () => {
    mockUseCharactersViewModel.mockReturnValue(createViewModel());

    const { container } = render(<CharactersPage />);

    expect(container.firstChild).toBeNull();
  });
});
