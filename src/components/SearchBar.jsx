import React from "react";

const SearchBar = ({ searchWord, setSearchWord }) => {
  const handleInputChange = (e) => {
    setSearchWord(e.target.value);
  };
  return (
    <div>
      <form className="md:max-w-2xl max-w-sm  mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm font-semibold text-[#e8d071] border-2 border-[#1666AE]
        rounded-md bg-[#1f2048] focus:ring-[#e8d071] focus:border-[#e8d071]"
            placeholder="Search Pikachu, Bulbasaur ..."
            required
            value={searchWord}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <button
            type="submit"
            className="text-[#1f2048] absolute end-2.5 bottom-2.5
         bg-[#e8d071] hover:bg-[#1666AE] focus:ring-4 
         focus:outline-none focus:ring-[#e8d071] font-medium 
         rounded-lg text-sm px-4 py-2 transition-all ease-in duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
