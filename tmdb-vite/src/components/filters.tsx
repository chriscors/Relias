import { Button, Slider, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
interface FilterProps {
  genreFilter: string[];
  setGenreFilter: Dispatch<SetStateAction<string[]>>;
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

  const clearFilters = () => {};
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

const genres = ["Comedy", "Action", "Horror"];

function getSelected(genre: string, selectedGenres: readonly string[]) {
  //Return sx for fontWeight regular in genre not in genreList, otherwise, return medium font if genre in genreList
  return {
    fontWeight: selectedGenres.indexOf(genre) === -1 ? "regular" : "bold",
  };
}

interface GenreProps {
  genreFilter: string[];
  setGenreFilter: Dispatch<SetStateAction<string[]>>;
}

function GenreSelect({ genreFilter, setGenreFilter }: GenreProps) {
  const handleChange = (event: SelectChangeEvent<typeof genreFilter>) => {
    //get the value of the select component
    const value = event.target.value;
    //set genreFilter to equal the value
    setGenreFilter(
      // Typescript: if  it's a string. split to be an array
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select
          id="genre-select"
          multiple
          label="" //remove the label for consistency
          value={genreFilter}
          onChange={handleChange}
          input={<OutlinedInput id="genre-select" />}
          renderValue={(selected) => (
            //Render the selected genres as chips
            <div className="flex gap-1">
              {selected.map((value) => (
                <Chip key={value} label={value} />
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
              >
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
