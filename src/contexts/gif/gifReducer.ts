import { GiphyGif } from "../../typings/GiphyGif";

export type GifState = {
  keyword: string;
  category: string;
  gifs: GiphyGif[];
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
  page: number;
};

export type Action = {
  type: string;
  payload: any;
};

export const gifReducer = (state: GifState, action: Action) => {
  switch (action.type) {
    case gifActions.SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        category: "",
        page: 0,
      };
    case gifActions.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        keyword: "",
        page: 0,
      };
    case gifActions.SET_GIFS:
      return {
        ...state,
        gifs: action.payload,
      };
    case gifActions.ADD_GIFS:
      return {
        ...state,
        gifs: [...state.gifs, ...action.payload],
      };
    case gifActions.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case gifActions.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export const gifActions = {
  SET_KEYWORD: "SET_KEYWORD",
  SET_CATEGORY: "SET_CATEGORY",
  SET_GIFS: "SET_GIFS",
  ADD_GIFS: "ADD_GIFS",
  SET_PAGINATION: "SET_PAGINATION",
  NEXT_PAGE: "NEXT_PAGE",
};
