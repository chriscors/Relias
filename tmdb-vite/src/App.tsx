import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./App.css";
import Sidebar from "./components/sidebar";
import MovieCard from "./components/movie-card";
import {
  CssBaseline,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { ThemeProvider } from "@emotion/react";

function App() {
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
        <Grid2 xs={12} sm={4}>
          <Sidebar />
        </Grid2>
        {/* Results */}
        <Grid2 xs={12} sm={8}>
          <Typography variant="h4" marginBottom={"1rem"}>
            Results
          </Typography>
          <Cards />
        </Grid2>
      </Grid2>
    </ThemeProvider>
  );
}

function Cards() {
  return (
    <Grid2 container spacing={3} justifyContent={"center"}>
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </Grid2>
  );
}

export default App;
