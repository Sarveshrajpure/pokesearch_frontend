import React from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import pokemonTypeColours from "../constants/constants";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PokemonDetails = () => {
  const location = useLocation();
  const item = location.state;

  console.log(location.state);

  const barChartOptions = {
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d4d8e3",
        },
        grid: {
          color: "transparent",
        },
      },
      x: {
        ticks: {
          color: "#d4d8e3",
        },
        grid: {
          color: "#181938",
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 25,
        borderSkipped: false,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Custom Chart Title",
      },
      legend: {
        display: false,
      },
    },
  };

  const barChartData = {
    labels: item?.stats.map((stat) => stat.stat.name.toUpperCase()),
    datasets: [
      {
        data: item?.stats.map((stat) => stat.base_stat),
        backgroundColor: "#e8d071",
      },
    ],
  };

  const colorAccordingToType = (type) => {
    const matchingKey = Object.keys(pokemonTypeColours).filter((key) => key === type);

    return pokemonTypeColours[matchingKey];
  };

  return (
    <div className="mt-20 md:px-40 px-5 ">
      <div className="pokeDetailsContainer ">
        <div className="pokemonNameContainer md:text-3xl font-semibold text-[#e8d071]">
          {item?.name.toUpperCase()} #{item.id}
        </div>
        <div className="pokemonImgInfoWrapper md:flex md:justify-center">
          <div className="pokemonImgInfoContainer md:flex mt-5 ">
            <div className="pokemonImgContainer  md:w-[40%] w-full">
              <img src={item?.sprites?.front_default} alt={item.name} width={350} />
            </div>
            <div className="pokemonInfoWrapper bg-[#272758] p-16 rounded-md ">
              <div className="infoRow flex gap-40 mb-5">
                <div className="infoCol">
                  <div className="text-lg font-medium text-[#e8d071] text-start">Height</div>
                  <div className="text-md  font-medium text-[#e8d071] text-start">
                    {item.height}m
                  </div>
                </div>
                <div className="infoCol">
                  <div className="text-lg font-medium text-[#e8d071] text-start">Weight</div>
                  <div className="text-md  font-medium text-[#e8d071] text-start">
                    {item.weight}kg
                  </div>
                </div>
              </div>

              <div className="infoRow flex gap-40 mb-5">
                <div className="infoCol">
                  <div className="text-lg font-medium text-[#e8d071] text-start">Abilities</div>
                  {item.abilities.map((item, index) => (
                    <div className="text-md font-medium text-[#e8d071] text-start">
                      {index + 1}. {item.ability.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="infoRow flex gap-40 ">
                <div className="infoCol">
                  <div className="text-lg font-medium text-[#e8d071] text-start">Type</div>
                  <div className="flex gap-2 justify-center mt-2">
                    {item.types?.map((item, index) => (
                      <div
                        className={`px-8 py-1 text-sm text-white font-medium rounded bg-[${colorAccordingToType(
                          item.type.name
                        )}]`}
                        key={index}
                      >
                        {item.type.name.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="statsTypeWrapper flex justify-center mt-10 mb-5">
          <div className="statsWrapper  bg-[#272758] rounded-md p-3">
            <div className="text-xl font-normal text-[#e8d071]">
              {item?.name[0].toUpperCase() + item?.name.slice(1)}'s Statistics
            </div>
            <div className="stats px-2 pb-2 md:w-[40rem] md:h-[12rem]">
              <Bar options={barChartOptions} data={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
