import React from "react";
import pokemonTypeColours from "../constants/constants";
import { useNavigate } from "react-router-dom";

const PokemonDisplayCard = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/pokedetails", { state: item });
  };

  const colorAccordingToType = (type) => {
    const matchingKey = Object.keys(pokemonTypeColours).filter((key) => key === type);

    return pokemonTypeColours[matchingKey];
  };

  return (
    <div
      className="cardContent mb-10 py-4 bg-[#272758] shadow-xl rounded-md 
       transition duration-[300ms] hover:scale-[1.1] h-[12rem]"
    >
      <div className="flex justify-center h-[5rem] ">
        <img
          src={item?.sprites?.front_default}
          alt={item.name}
          width={130}
          className="-mt-16 cursor-pointer"
          onClick={handleNavigate}
        />
      </div>
      <div className="pokemonNameWrapper flex justify-center">
        <div
          className="text-xl text-[#e8d071] font-semibold cursor-pointer max-w-fit"
          onClick={handleNavigate}
        >
          {item.name.toUpperCase()}
        </div>
      </div>

      <div className="pokemonTypeContainer flex gap-2 justify-center mt-2">
        {item.types?.map((item, index) => (
          <div
            className={`px-4 py-1 text-xs text-white font-medium rounded bg-[${colorAccordingToType(
              item.type.name
            )}]`}
            key={index}
          >
            {item.type.name.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="text-gray-300 text-sm font-semibold mt-2">#{item.id}</div>
    </div>
  );
};

export default PokemonDisplayCard;
