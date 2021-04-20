import { useContext } from "react";
import { GifContext } from "../../../contexts/gif/GifContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { gifActions } from "../../../contexts/gif/gifReducer";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/FavoriteOutlined";
import NotFavoriteIcon from "@material-ui/icons/FavoriteBorder";
import { FavoriteContext } from "../../../contexts/favorites/FavoriteContext";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
      height: "100%",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

const SearchResults = () => {
  const classes = useStyles();

  const { favoriteGifs, toggleFavorite } = useContext(FavoriteContext);
  const { gifState, dispatch } = useContext(GifContext);
  const { gifs, pagination, loading } = gifState;
  if (loading) return <LinearProgress></LinearProgress>;
  return (
    <div className={classes.root}>
      <InfiniteScroll
        dataLength={gifs.length} //This is important field to render the next data
        next={() => dispatch({ type: gifActions.NEXT_PAGE, payload: null })}
        hasMore={pagination.total_count > gifs.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No Result</b>
          </p>
        }
      >
        <GridList
          spacing={1}
          cellHeight={180}
          className={classes.gridList}
          cols={5}
        >
          <GridListTile key="Subheader" cols={5} style={{ height: "auto" }}>
            <ListSubheader component="div">Results</ListSubheader>
          </GridListTile>
          {gifs.map((gif, index) => (
            <GridListTile key={index} cols={1}>
              <img
                src={`https://media.giphy.com/media/${gif.id}/source.gif`}
                alt={gif.title}
              />
              <GridListTileBar
                title={gif.title}
                subtitle={<span>by: {gif.username}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${gif.title}`}
                    className={classes.icon}
                    onClick={() => toggleFavorite(gif)}
                  >
                    {favoriteGifs.find((fav) => fav.id === gif.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <NotFavoriteIcon />
                    )}
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </InfiniteScroll>
    </div>
  );
};

export default SearchResults;
