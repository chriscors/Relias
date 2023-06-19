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
      {/* Outer level grid */}
      <Grid2 container spacing={2}>
        {/* Sidebar */}
        <Grid2 xs={12} sm={4} md={3}>
          <Sidebar movieData={movieData} setMovieData={setMovieData} />
        </Grid2>
        {/* Results */}
        <Grid2 xs={12} sm={8} md={9}>
          <Typography variant="h4" marginBottom={"1rem"}>
            Results
          </Typography>
          <Grid2 container spacing={3} justifyContent={"space-evenly"}>
            {movieData &&
              movieData.map((movie) => <MovieCard movieData={movie} />)}
          </Grid2>
        </Grid2>
      </Grid2>
    </ThemeProvider>
  );
}

export default App;
