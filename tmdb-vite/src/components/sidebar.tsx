import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import Filters from "./filters";

export default function Sidebar() {
  const date = new Date();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [releaseFilter, setReleaseFilter] = useState<number[]>([
    1990,
    date.getFullYear(),
  ]);

  const handleToggleOpen = () => {
    setMobileOpen((open) => !open);
  };

  const handleSearch = () => {};

  /* Render: 
      1. Search Bar
        - A filter button hidden on > sm that opens the box 
      2. A bounded box with all the filters in it that is shown on >sm
      3. A copy of the box that is hidden on mobile
  */
  return (
    <>
      <Grid2 container alignItems={"start"} marginBottom={"2rem"}>
        <Grid2 xs={10}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchText(event.target.value);
            }}
          />
        </Grid2>
        <Grid2 xs={2}>
          <IconButton
            onClick={handleSearch}
            size="large"
            sx={{ height: "100%" }}
          >
            <SearchIcon />
          </IconButton>
        </Grid2>
        <Grid2
          sx={{ display: { xs: "none", sm: "block" }, width: "100%" }}
          sm={12}
        >
          <Divider sx={{ margin: "1rem 0" }} />
          {/* Show filters */}
          <Filters
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            releaseFilter={releaseFilter}
            setReleaseFilter={setReleaseFilter}
          />
        </Grid2>
      </Grid2>
    </>
  );
}
