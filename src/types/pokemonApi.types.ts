export interface IPokemon {
  name: string;
  url: string;
}
export type PokemonDataFn = (search: string) => Promise<IPokemon[]>;
