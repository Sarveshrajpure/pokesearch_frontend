import React from "react";
import logo from "../assets/pokeSearchLogo.png";
import pikachuHi from "../assets/pikachu-hi.gif";
const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#1f2048] border-gray-200 backdrop-blur-md shadow-sm">
      <div className="flex  items-center justify-between p-1 md:pt-2 md:pb-3 mx-2 md:mx-5">
        <div className="">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} width={120} height={70} className="object-contain pt-1" alt="CgLogo" />
            <div className="text-2xl font-semibold"></div>
          </a>
        </div>
        <div className="text-lg font-medium">
          <img src={pikachuHi} alt="pikachu" width={40} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
