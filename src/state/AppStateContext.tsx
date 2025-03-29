import { createContext, FC } from "react";
import { usePageState } from "./usePageState";
//import { Page } from "../utils/types";
import { withInitialState } from "./withInitialState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType
);

type AppStateProviderProps = {
  children: React.ReactNode;
  //initialState: Page;
};

export const AppStateProvider: FC<AppStateProviderProps> =
  withInitialState<AppStateProviderProps>(({ children, initialState }) => {
    const pageStateHanldlers = usePageState(initialState);

    return (
      <AppStateContext.Provider value={pageStateHanldlers}>
        {children}
      </AppStateContext.Provider>
    );
  });

export { AppStateContext };
