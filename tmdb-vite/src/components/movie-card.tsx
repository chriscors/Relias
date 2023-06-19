import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "../App.css";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Star, StarBorder, StarBorderOutlined } from "@mui/icons-material";
import { MovieData } from "../types";
import TheatersIcon from "@mui/icons-material/Theaters";
interface MovieDataProps {
  movieData: MovieData;
}

export default function MovieCard({ movieData }: MovieDataProps) {
  const releaseDate = new Date(movieData.release_date);
  return (
    <Grid2>
      <Card
        sx={{
          width: 275,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          //Movie poster
          sx={{ height: 340 }}
          image={
            movieData.poster_path
              ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
              : "../film.png"
          }
          className={`${!movieData.poster_path && "no-poster"} description`}
        >
          <Grid2
            //Container for the description
            container
            sx={{
              display: { xs: "none" },
              height: "100%",
              alignItems: "center",
              transition: "display 1s ease-in-out",
              color: "white",
            }}
          >
            <Typography
              //Description text
              variant="body"
              color="text"
              sx={{
                textAlign: "center",
                margin: "1rem",
              }}
            >
              {movieData.overview}
            </Typography>
          </Grid2>
        </CardMedia>
        <CardContent
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid2 container>
            <Grid2>
              <Typography gutterBottom variant="h5" component="div">
                {
                  //Movie title
                  movieData.title
                }
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2 container justifyContent={"space-between"}>
            <Typography variant="h6">
              {movieData.release_date && releaseDate.getFullYear()}
            </Typography>
            <Grid2
              xs={3}
              container
              justifyContent={"end"}
              alignContent={"flex-start"}
            >
              <Typography gutterBottom variant="h6" sx={{ margin: "auto 0" }}>
                {movieData?.vote_average && movieData.vote_average.toFixed(1)}
              </Typography>
              {movieData?.vote_average && movieData.vote_average < 3 ? (
                <StarBorderOutlined sx={{ height: "100%" }} />
              ) : movieData?.vote_average && movieData.vote_average < 7 ? (
                <StarHalfIcon sx={{ height: "100%" }} />
              ) : (
                <Star sx={{ height: "100%" }} />
              )}
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Grid2>
  );
}
