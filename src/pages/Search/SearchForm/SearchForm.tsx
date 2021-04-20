import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useContext } from "react";
import { GifContext } from "../../../contexts/gif/GifContext";
import { gifActions } from "../../../contexts/gif/gifReducer";
import { Box } from "@material-ui/core";

const SearchForm = () => {
  const { dispatch, gifState } = useContext(GifContext);
  const { keyword, category } = gifState;

  const handleKeywordChange = (keyword: string) => {
    dispatch({ type: gifActions.SET_KEYWORD, payload: keyword });
  };
  const handleCategoryChange = (category: string) => {
    dispatch({ type: gifActions.SET_CATEGORY, payload: category });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <TextField
        label="Keyword"
        value={keyword}
        onChange={(event) => handleKeywordChange(event.target.value)}
      />
      <FormControl>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            handleCategoryChange(event.target.value as string)
          }
        >
          <MenuItem value={"gaming"}>Gaming</MenuItem>
          <MenuItem value={"actions"}>Actions</MenuItem>
          <MenuItem value={"celebrities"}>Celebrities</MenuItem>
          <MenuItem value={"movies"}>Movies</MenuItem>
          <MenuItem value={"holiday"}>Holiday</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchForm;
