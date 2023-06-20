import { Divider, IconButton, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import Filters from "./filters";
import { ApiResponse, Genre, MovieData } from "../types";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "axios";

interface SidebarProps {
  setApiResponse: Dispatch<SetStateAction<ApiResponse | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setHasSearched: Dispatch<SetStateAction<boolean>>;
  genreFilter: Genre[];
  setGenreFilter: Dispatch<SetStateAction<Genre[]>>;
  ratingFilter: number;
  setRatingFilter: Dispatch<SetStateAction<number>>;
  releaseFilter: number[];
  setReleaseFilter: Dispatch<SetStateAction<number[]>>;
}

export default function Sidebar({
  setApiResponse,
  setLoading,
  setHasSearched,
  genreFilter,
  setGenreFilter,
  ratingFilter,
  setRatingFilter,
  releaseFilter,
  setReleaseFilter,
}: SidebarProps) {
  //Value of the search bar
  const [searchText, setSearchText] = useState("");
  //Is the filter box open on mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (event: any) => {
    //Set loading to true (show spinner), clear past results, and set has searched to true, changing header
    setLoading(true);
    setApiResponse(null);
    setHasSearched(true);
    //prevent the page from loading when enter is pressed
    event.preventDefault();

    //get the first page of data
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: searchText,
        include_adult: "false",
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
        //format the release date as a date object
        response.data.results.map(
          (movie: MovieData) =>
            (movie.release_date = new Date(movie.release_date))
        );

        //if theres more than one page of data, get all of the results as a singular object so that they can be filtered
        if (response.data.total_pages > 1) {
          getAllResults(response.data);
        } else {
          //set state
          setApiResponse(response.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getAllResults = async (baseResponse: ApiResponse) => {
    //repeat axios call for each remaining page of the results
    for (let pageNum = 2; pageNum < baseResponse.total_pages; pageNum++) {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: searchText,
          include_adult: "false",
          language: "en-US",
          page: pageNum,
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjViZGY3NTBiZDM1OGFiOWY0ZGNiZDE1N2M0MjNiZiIsInN1YiI6IjY0ODg3MjhiOTkyNTljMDBjNWI2NGIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kIfA4gOg-CgepL5qMEVtbdh7oOp9NzF--Gs3y8l90JI",
        },
      };
      //utilize async await to obtain data - forces function to pause for promise, fixing state update issue
      const response = await axios.request(options);

      //format the release date as a date object
      response.data.results.map(
        (movie: MovieData) =>
          (movie.release_date = new Date(movie.release_date))
      );

      //utilize spread operator to combine arrays
      baseResponse.results = [
        ...baseResponse.results,
        ...response.data.results,
      ];

      setApiResponse(baseResponse);
    }
    setLoading(false);
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
        <Grid2 xs={2} sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            //on click, toggle filter open
            onClick={() => setMobileOpen((open) => !open)}
            size="large"
            sx={{ height: "100%" }}
            aria-label="Toggle Filters"
          >
            <FilterListIcon />
          </IconButton>
        </Grid2>
        <Grid2 xs={8} sm={10}>
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
              aria-label="Search"
            />
          </form>
        </Grid2>
        <Grid2 container xs={2} justifyContent={"flex-end"}>
          <IconButton
            onClick={handleSearch}
            size="large"
            sx={{ height: "100%" }}
            aria-label="Submit Search"
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
      <Grid2
        //shows only on xs and if filter is clicked
        sx={
          mobileOpen
            ? { display: { xs: "block", sm: "none" }, width: "100%" }
            : { display: "none" }
        }
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
    </>
  );
}
