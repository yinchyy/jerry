export interface Character {
  name: string;
  image: string;
  species: string;
  origin: string;
  gender: string;
  status: string;
}
export interface CharacterResult {
  characters: {
    results: Character[];
  };
}
