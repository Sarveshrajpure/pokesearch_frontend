import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";
import { getPokemons } from "../Actions/PokemonActions";
import PokemonDisplayCard from "../components/PokemonDisplayCard";
import pokemonTypeColours from "../constants/constants";
import { FallingLines } from "react-loader-spinner";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const pageLimit = 12;

  const [inSearch, setInSearch] = useState(false);
  const [reload, setReload] = useState(false);
  const [loader, setLoader] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [paginationStart, setPaginationStart] = useState(0);
  const [paginationEnd, setPaginationEnd] = useState(12);

  const increaseOffset = () => {
    if (paginationEnd <= pokemonData[0]?.count) {
      if (paginationStart + pageLimit <= pokemonData[0]?.count) {
        setPaginationStart(paginationEnd + 1);
      }

      if (paginationEnd + pageLimit >= pokemonData[0]?.count) {
        let diff = pokemonData[0]?.count - paginationEnd;
        console.log("diff", pokemonData[0]?.count - paginationEnd);
        setPaginationEnd((prev) => prev + diff);
      } else {
        setPaginationEnd((prev) => prev + pageLimit);
      }
    }
  };

  const decreaseOffset = () => {
    if (paginationStart > 1) {
      setPaginationStart((prev) => prev - pageLimit);
    }

    if (paginationEnd > 12) {
      setPaginationEnd((prev) => prev - pageLimit);
    }
  };

  useEffect(() => {
    const getPokemonsData = async () => {
      try {
        setLoader(true);
        let values = `?limit=${pageLimit}&offset=${
          paginationStart === 0 ? 0 : paginationStart - 1
        }`;
        let response = await getPokemons(values);
        let results = response[0].results;

        // adding pokemon type colors
        for (let i = 0; i < results?.length; i++) {
          for (let j = 0; j < results[i]?.types.length; j++) {
            let matchingKey = Object.keys(pokemonTypeColours).filter(
              // eslint-disable-next-line no-loop-func
              (key) => key === results[i].types[j].type.name
            );
            results[i].types[j].type.color = pokemonTypeColours[matchingKey];
          }
        }

        setPokemonData(response);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
        toast.error("Error fetching pokemons!");
      }
    };

    getPokemonsData();
  }, [paginationStart, reload]);

  return (
    <div className="mt-16">
      <div className="searchContainer pt-8">
        <div className="text-2xl font-semibold text-[#e8d071]">Search for a Pokémon</div>
        <div className="searchInputWrapper mt-2">
          <SearchBar
            setPokemonData={setPokemonData}
            setInSearch={setInSearch}
            setLoader={setLoader}
          />
        </div>

        <div className="explorePokemonsContainer mt-5">
          <div className="text-xl font-semibold text-[#e8d071]">Explore Pokémons</div>
          {inSearch ? (
            <div className="flex justify-center">
              <div
                className="searchBackBtn w-[80%]"
                onClick={() => {
                  setReload((prev) => !prev);
                  setInSearch(false);
                }}
              >
                <ArrowUturnLeftIcon className="w-10 cursor-pointer text-[#e8d071] " />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="pokemonsDisplayWrapper flex justify-center mt-10 h-[50rem] ">
            {loader ? (
              <div className="flex justify-center items-center">
                <FallingLines
                  color="#e8d071"
                  width="80"
                  visible={true}
                  ariaLabel="falling-circles-loading"
                />
              </div>
            ) : (
              <div className="pokemonsDisplay w-[80%] grid md:grid-cols-4 gap-5">
                {pokemonData[0]?.results.map((item, index) => (
                  <PokemonDisplayCard item={item} key={item.id} />
                ))}
              </div>
            )}
          </div>
        </div>
        {inSearch ? (
          ""
        ) : (
          <div className="paginationBtns mt-5 mb-5">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-200 ">
                Showing{" "}
                <span className="font-semibold text-[#e8d071] ">
                  {paginationStart === 0 ? "1" : paginationStart}
                </span>{" "}
                to <span className="font-semibold text-[#e8d071] d">{paginationEnd}</span> of{" "}
                <span className="font-semibold text-[#e8d071] ">{pokemonData[0]?.count}</span>{" "}
                Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  className="flex items-center justify-center px-4 h-10 text-base font-medium
                text-[#e8d071] bg-[#272758] border-0 border-s
                border-gray-700 rounded-s hover:bg-[#323272]"
                  onClick={decreaseOffset}
                >
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
                      strokeLinejoin="round"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Prev
                </button>
                <button
                  className="flex items-center justify-center px-4 h-10 text-base font-medium
                text-[#e8d071] bg-[#272758] border-0 border-s
                border-gray-700 rounded-e hover:bg-[#323272]"
                  onClick={increaseOffset}
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
                      strokeLinejoin="round"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
