import { useContext } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/FavoriteOutlined";
import { FavoriteContext } from "../../../contexts/favorites/FavoriteContext";

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

const FavoritesList = () => {
  const classes = useStyles();
  const { favoriteGifs, removeFavorite } = useContext(FavoriteContext);

  return (
    <div className={classes.root}>
      <GridList
        spacing={1}
        cellHeight={180}
        className={classes.gridList}
        cols={5}
      >
        <GridListTile key="Subheader" cols={5} style={{ height: "auto" }}>
          <ListSubheader component="div">Your Favorites</ListSubheader>
        </GridListTile>
        {favoriteGifs.map((gif, index) => (
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
                  onClick={() => removeFavorite(gif)}
                >
                  <FavoriteIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default FavoritesList;
