import React, { createContext, useReducer, useEffect, Dispatch } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Action, gifActions, gifReducer, GifState } from "./gifReducer";

export type GifContextValues = {
  gifState: GifState;
  dispatch: Dispatch<Action>;
};

const initialState = {
  gifs: [],
  keyword: "",
  category: "",
  pagination: { count: 25, offset: 0, total_count: 0 },
  page: 0,
  loading: false,
};

export const GifContext = createContext<GifContextValues>({
  gifState: initialState,
  dispatch: () => {},
});

const GifContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [gifState, dispatch] = useReducer(gifReducer, initialState);
  const { keyword, category, page } = gifState;
  const debouncedKeyword = useDebounce(keyword, 1000);

  useEffect(() => {
    if (category !== "" || debouncedKeyword.length >= 3) {
      fetch(
        `${process.env.REACT_APP_GIPHY_API_URL}gifs/search?q=${
          category || debouncedKeyword
        }&limit=25&offset=${page}&api_key=${
          process.env.REACT_APP_GIPHY_API_KEY
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          if (page === 0) {
            dispatch({
              type: gifActions.SET_GIFS,
              payload: data.data,
            });
          } else {
            dispatch({
              type: gifActions.ADD_GIFS,
              payload: data.data,
            });
          }
          dispatch({
            type: gifActions.SET_PAGINATION,
            payload: data.pagination,
          });
        });
    }
  }, [debouncedKeyword, category, page]);

  return (
    <GifContext.Provider value={{ gifState, dispatch }}>
      {children}
    </GifContext.Provider>
  );
};

export default GifContextProvider;
