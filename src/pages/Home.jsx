import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";
import { getPokemons } from "../Actions/PokemonActions";
import PokemonDisplayCard from "../components/PokemonDisplayCard";

const Home = () => {
  const pageLimit = 10;
  const [searchWord, setSearchWord] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [paginationOffset, setPaginationOffset] = useState(0);

  console.log(searchWord);

  useEffect(() => {
    const getPokemonsData = async () => {
      try {
        let values = `?limit=${pageLimit}&offset=${paginationOffset}`;
        let response = await getPokemons(values);

        setPokemonData(response);
      } catch (err) {
        console.log(err);
        toast.error("Error fetching pokemons!");
      }
    };

    getPokemonsData();
  }, [paginationOffset]);
  return (
    <div className="mt-16">
      <div className="searchContainer pt-8">
        <div className="text-2xl font-semibold text-[#e8d071]">Search for a Pokémon</div>
        <div className="searchInputWrapper mt-2">
          <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
        </div>
        <div className="pokemonsDisplayWrapper flex justify-center mt-10">
          <div className="pokemonsDisplay p-2 flex flex-wrap w-[90rem] bg-white">
            {pokemonData[0]?.results.map((item, index) => (
              <PokemonDisplayCard item={item} key={index} />
            ))}
          </div>
        </div>

        <div className="paginationBtns mt-10">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">10</span> of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">100</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg
                  className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                Prev
              </button>
              <button
                className="flex items-center justify-center px-4 h-10 text-base font-medium
               text-white bg-gray-800 border-0 border-s
                border-gray-700 rounded-e hover:bg-gray-900"
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
