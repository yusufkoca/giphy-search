import GifContextProvider from "./contexts/gif/GifContext";
import FavoriteContextProvider from "./contexts/favorites/FavoriteContext";
import Router from "./routes/Router";

function App() {
  return (
    <GifContextProvider>
      <FavoriteContextProvider>
        <Router></Router>
      </FavoriteContextProvider>
    </GifContextProvider>
  );
}

export default App;
