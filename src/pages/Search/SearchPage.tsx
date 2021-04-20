import { Box } from "@material-ui/core";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const SearchPage = () => {
  return (
    <Box width="100%">
      <SearchForm></SearchForm>
      <SearchResults></SearchResults>
    </Box>
  );
};

export default SearchPage;
