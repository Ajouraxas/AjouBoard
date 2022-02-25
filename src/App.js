import ClubContainer from "./components/ClubList.js";
import GlobalNavigationBar from "./components/GlobalNavigationBar.js";
import HomeContent from "./components/HomeContent.js";

/**
 * ClubPage 접속 : http://localhost:3000/#/club/123
 * Home 접속 : http://localhost:3000/#/
 */

function App() {
  return (
    <div>
      <GlobalNavigationBar />
      <ClubContainer />
      <HomeContent />
    </div>

  );
}

export default App;
