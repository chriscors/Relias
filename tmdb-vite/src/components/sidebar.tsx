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
import { Dispatch, SetStateAction, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import Filters from "./filters";
import { ApiResponse, MovieData } from "../types";
import axios from "axios";

export default function Sidebar({
  apiResponse,
  setApiResponse,
}: {
  apiResponse: ApiResponse;
  setApiResponse: Dispatch<SetStateAction<ApiResponse>>;
}) {
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const date = new Date();
  const [searchText, setSearchText] = useState("");

  const [mobileOpen, setMobileOpen] = useState(false);

  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [releaseFilter, setReleaseFilter] = useState<number[]>([
    1900,
    date.getFullYear(),
  ]);

  const handleToggleOpen = () => {
    setMobileOpen((open) => !open);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: searchText,
        include_adult: "true",
        language: "en-US",
        page: 1,
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjViZGY3NTBiZDM1OGFiOWY0ZGNiZDE1N2M0MjNiZiIsInN1YiI6IjY0ODg3MjhiOTkyNTljMDBjNWI2NGIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kIfA4gOg-CgepL5qMEVtbdh7oOp9NzF--Gs3y8l90JI",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.total_pages > 1) {
          getAllResults(response.data);
        } else setApiResponse(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getAllResults = async (baseResponse: ApiResponse) => {
    for (let pageNum = 2; pageNum < baseResponse.total_pages; pageNum++) {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: searchText,
          include_adult: "true",
          language: "en-US",
          page: pageNum,
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjViZGY3NTBiZDM1OGFiOWY0ZGNiZDE1N2M0MjNiZiIsInN1YiI6IjY0ODg3MjhiOTkyNTljMDBjNWI2NGIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kIfA4gOg-CgepL5qMEVtbdh7oOp9NzF--Gs3y8l90JI",
        },
      };

      const response = await axios.request(options);

      baseResponse.results = [
        ...baseResponse.results,
        ...response.data.results,
      ];
    }
  };

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
          <form onSubmit={handleSearch}>
            <TextField
              id="outlined-basic"
              label="Search for a Movie"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchText(event.target.value);
              }}
            />
          </form>
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
