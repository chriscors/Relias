import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./App.css";
import Sidebar from "./components/sidebar";
import MovieCard from "./components/movie-card";
import {
  Button,
  CircularProgress,
  CssBaseline,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { MovieData } from "./types";
function App() {
  //State holding  json movie data
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  //Logic for setting MUI Dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    // Enable dark mode using the theme provider component
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {hasSearched ? (
        <Typography variant="h4" marginY={4} textAlign={"center"}>
          Results ({apiResponse?.total_results})
        </Typography>
      ) : (
        <Typography variant="h4" marginY={4} textAlign={"center"}>
          Search for a movie
        </Typography>
      )}
      {/* Outer level grid */}
      <Grid2 container spacing={2}>
        {/* Sidebar */}
        <Grid2 xs={12} sm={4} md={3}>
          <Sidebar
            setApiResponse={setApiResponse}
            setLoading={setLoading}
            setHasSearched={setHasSearched}
          />
        </Grid2>
        {/* Results */}
        <Grid2 xs={12} sm={8} md={9}>
          <Grid2
            container
            spacing={3}
            justifyContent={"space-evenly"}
            height={"100%"}
          >
            {loading && <CircularProgress sx={{ margin: "5rem 0" }} />}
            {apiResponse &&
              apiResponse.results
                .slice(0, paginate)
                .map((movie) => <MovieCard movieData={movie} key={movie.id} />)}
          </Grid2>
          {apiResponse && (
            <div className="flex justify-center align-center h-20">
              <Button
                size="large"
                onClick={() => setPaginate((page) => page + 20)}
              >
                Show More
              </Button>
            </div>
          )}
        </Grid2>
      </Grid2>
    </ThemeProvider>
  );
}

export default App;
