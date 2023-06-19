import { Button, Slider, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { Genre } from "../types";
interface FilterProps {
  genreFilter: Genre[];
  setGenreFilter: Dispatch<SetStateAction<Genre[]>>;
  ratingFilter: number;
  setRatingFilter: Dispatch<SetStateAction<number>>;
  releaseFilter: number[];
  setReleaseFilter: Dispatch<SetStateAction<number[]>>;
}

export default function Filters({
  genreFilter,
  setGenreFilter,
  ratingFilter,
  setRatingFilter,
  releaseFilter,
  setReleaseFilter,
}: FilterProps) {
  const date = new Date();

  //On button click, reset filters to original state
  const clearFilters = () => {
    setRatingFilter(0);
    setReleaseFilter([1900, date.getFullYear()]);
    setGenreFilter([]);
  };
  return (
    <>
      <Grid2 container>
        <Grid2 xs={8} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Filters</Typography>
        </Grid2>
        <Grid2 xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* Add a show only if filters selected */}
          <Button onClick={clearFilters}>Clear</Button>
        </Grid2>
      </Grid2>
      <Grid2
        container
        spacing={3}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Grid2>
          {/* Genre select dropdown */}
          <Typography sx={{ fontWeight: "bold" }}>Genre</Typography>
          <GenreSelect
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
          />
        </Grid2>
        <Grid2>
          {/* Minimum Rating slider */}
          <Typography sx={{ fontWeight: "bold" }}>
            Minimum Rating: {ratingFilter}
          </Typography>
          <Slider
            defaultValue={0}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={10}
            value={ratingFilter}
            onChange={(e, v) => setRatingFilter(v as number)}
          />
        </Grid2>
        <Grid2>
          {/* Release year between range */}
          <Typography sx={{ fontWeight: "bold" }}>
            Release Dates: {`${releaseFilter[0]} - ${releaseFilter[1]}`}
          </Typography>
          <Slider
            defaultValue={0}
            valueLabelDisplay="auto"
            step={1}
            min={1900}
            max={date.getFullYear()}
            value={releaseFilter}
            onChange={(e, v) => setReleaseFilter(v as number[])}
          />
        </Grid2>
      </Grid2>
    </>
  );
}

function getSelected(genre: Genre, selectedGenres: Genre[]) {
  //Return sx for fontWeight regular in genre not in genreList, otherwise, return medium font if genre in genreList
  return {
    fontWeight:
      selectedGenres.map((gen) => gen.id).indexOf(genre.id) === -1
        ? "regular"
        : "bold",
  };
}

function GenreSelect({
  genreFilter,
  setGenreFilter,
}: {
  genreFilter: Genre[];
  setGenreFilter: Dispatch<SetStateAction<Genre[]>>;
}) {
  //List of genres obtained from API below
  const [genres, setGenres] = useState<Genre[]>([]);

  //Get the genre ids for filter
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      params: { language: "en" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjViZGY3NTBiZDM1OGFiOWY0ZGNiZDE1N2M0MjNiZiIsInN1YiI6IjY0ODg3MjhiOTkyNTljMDBjNWI2NGIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kIfA4gOg-CgepL5qMEVtbdh7oOp9NzF--Gs3y8l90JI",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);

        setGenres(response.data.genres);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleToggleGenre = (genre: Genre) => {
    //Get the index of the genre ID (-1 if not found)
    const genreIndex = genreFilter.map((g) => g.id).indexOf(genre.id);

    if (genreIndex !== -1) {
      // Genre object found, remove it from the array, first making a shallow copy then removing it and updating the state
      const updatedGenres = [...genreFilter];
      updatedGenres.splice(genreIndex, 1);
      setGenreFilter(updatedGenres);
    } else {
      // Genre object not found, add it to the array
      setGenreFilter([...genreFilter, genre]);
    }
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select
          id="genre-select"
          multiple
          label="" //remove the label for consistency
          value={genreFilter.map((g) => g.name)}
          input={<OutlinedInput id="genre-select" />}
          renderValue={(selectedGenres) => (
            //Render the selected genres as chips
            <div className="flex gap-1">
              {selectedGenres.map((genre) => (
                <Chip key={genre} label={genre} />
              ))}
            </div>
          )}
        >
          {genres.length > 0 &&
            genres.map((genre) => (
              <MenuItem
                key={genre.id}
                value={genre.name}
                style={getSelected(genre, genreFilter)}
                onClick={() => handleToggleGenre(genre)}
              >
                {genre.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
