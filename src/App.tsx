import Page from "./Page/Page.component";
import { AppStateProvider } from "./state/AppStateContext";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import Private from "./auth/Private";

const App = () => {
  return (
    <Routes>
      <Route
        path="/auth"
        element={<Auth />}
      />
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  );
};

export default App;

