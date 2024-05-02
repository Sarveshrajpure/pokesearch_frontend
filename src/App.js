import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBarLayout from "./utils/NavBarLayout";
import "./App.css";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route element={<NavBarLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pokedetails" element={<PokemonDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
