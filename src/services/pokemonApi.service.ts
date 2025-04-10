import { ApiLocal } from "../constants/api.constant";
import { IPokemon } from "../types/pokemonApi.types";
import httpClient from "./pokemon";

export const pokemonsServices = {
  getPokemons: async ({ filteredName }: { filteredName: string }) => {
    const response = await httpClient.get(ApiLocal.allPokemons);
    return response.data.results.filter((pokemon: IPokemon) =>
      pokemon.name.includes(filteredName)
    );
  },
};
