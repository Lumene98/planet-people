import MainContainer from "./components/MainContainer";
import UserGrid from "./components/UserGrid";
import "./index.css";

function App() {
  return (
    <div className="w-full flex justify-center">
      <MainContainer>
        <UserGrid></UserGrid>
      </MainContainer>
    </div>
  );
}

export default App;
