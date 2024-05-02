import { axiosInstance } from "../utils//axiosHelper";

export const getPokemons = async (values) => {
  let response = await axiosInstance.get(`/pokemon/getallpokemons${values}`);

  return response.data;
};

export const getPokemonByName = async (values) => {
  let response = await axiosInstance.get(`/pokemon/searchpokemon?name=${values}`);

  return response.data;
};
