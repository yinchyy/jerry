export interface Character {
  name: string;
  image: string;
  species: string;
  origin: string;
  gender: string;
  status: string;
  combined: {
    name: string;
    species: string;
  };
}
export interface CharacterResult {
  characters: {
    info: {
      next: number | null;
      count: number;
    };
    results: Character[];
  };
}
export interface SpeciesResult {
  characters: {
    info: {
      next: number | null;
    };
    results: Array<{ species: string }>;
  };
}
