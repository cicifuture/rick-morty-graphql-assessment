import { render, screen } from '@testing-library/react';
import CharacterCard from '../index';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Character } from '@/services/characters/characters';

describe('CharacterCard', () => {
  const character: Character = {
    id: '1',
    name: 'Birdperson',
    species: 'Bird-Person',
    imageUrl: 'https://example.com/birdperson.png',
  };

  it('renders the character information', () => {
    render(<CharacterCard character={character} />);

    expect(screen.getByRole('img', { name: character.name })).toHaveAttribute(
      'src',
      character.imageUrl
    );
    expect(screen.getByRole('heading', { level: 3, name: character.name })).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
  });

  it('marks the image for lazy loading to keep the list responsive', () => {
    render(<CharacterCard character={character} />);

    expect(screen.getByRole('img', { name: character.name })).toHaveAttribute('loading', 'lazy');
  });
});
