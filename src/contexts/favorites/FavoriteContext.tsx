import React, { createContext, useEffect, useState } from "react";
import { GiphyGif } from "../../typings/GiphyGif";

export type FavoriteContextValues = {
  favoriteGifs: GiphyGif[];
  toggleFavorite: (gif: GiphyGif) => void;
  addFavorite: (gif: GiphyGif) => void;
  removeFavorite: (gif: GiphyGif) => void;
};

export const FavoriteContext = createContext<FavoriteContextValues>({
  favoriteGifs: [],
  toggleFavorite: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
});

const getFavoritesLocalStorage = () => {
  const localData = localStorage.getItem("favoriteGifs");
  return localData ? JSON.parse(localData) : [];
};

const FavoriteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteGifs, setFavoriteGifs] = useState<GiphyGif[]>(
    getFavoritesLocalStorage()
  );

  useEffect(() => {
    localStorage.setItem("favoriteGifs", JSON.stringify(favoriteGifs));
  }, [favoriteGifs]);

  const toggleFavorite = (gif: GiphyGif) => {
    const newFavs = [...favoriteGifs];
    const index = favoriteGifs.findIndex((favorite) => favorite.id === gif.id);
    if (index >= 0) {
      newFavs.splice(index, 1);
      setFavoriteGifs(newFavs);
    } else {
      newFavs.push(gif);
      setFavoriteGifs(newFavs);
    }
  };

  const addFavorite = (gif: GiphyGif) => {
    setFavoriteGifs([...favoriteGifs, gif]);
  };

  const removeFavorite = (gif: GiphyGif) => {
    const newFavs = [...favoriteGifs];
    const index = favoriteGifs.findIndex((favorite) => favorite.id === gif.id);
    newFavs.splice(index, 1);
    setFavoriteGifs(newFavs);
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteGifs, toggleFavorite, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
