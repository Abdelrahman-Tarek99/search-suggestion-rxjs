import { useMemo, useState } from "react";
import {
  BehaviorSubject,
  debounceTime,
  filter,
  from,
  mergeMap,
  switchMap,
} from "rxjs";
import { IPokemon } from "../types/pokemonApi.types";
import { useObservable } from "../hooks/useObservable";
import { pokemonsServices } from "../services/pokemonApi.service";

export const PokemonList = () => {
  const searchSubject = useMemo(() => new BehaviorSubject(""), []);
  // Memoize the observable chain
  const searchResultObservable = useMemo(
    () =>
      searchSubject.pipe(
        filter((search) => search.length > 1),
        debounceTime(500),
        mergeMap((search) =>
          from(pokemonsServices.getPokemons({ filteredName: search }))
        )
      ),
    [searchSubject] // Only depends on searchSubject
  );
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<IPokemon[]>([]);
  useObservable(searchResultObservable, setResults);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearch(newValue);
    searchSubject.next(newValue);
  };

  return (
    <>
      <div>
        {/* You can render your pokemon data here */}
        Pokemon List
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for a Pokemon"
      />
      <div className="pokemon-list__items">
        {results.map((pokemon: IPokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <h3 className="pokemon-card__title">{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
