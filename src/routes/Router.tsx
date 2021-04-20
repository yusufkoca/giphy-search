import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import FavoritesPage from "../pages/Favorites";
import SearchPage from "../pages/Search";

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Layout>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/favorites">
              <FavoritesPage></FavoritesPage>
            </Route>
          </Layout>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
