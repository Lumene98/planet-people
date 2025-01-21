import MainContainer from "./components/MainContainer";
import PlanetPopup from "./components/PlanetPopup";
import UserGrid from "./components/UserGrid";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-full flex justify-center">
      <MainContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserGrid />}>
              <Route path="planet/:id" element={<PlanetPopup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MainContainer>
    </div>
  );
}

export default App;
