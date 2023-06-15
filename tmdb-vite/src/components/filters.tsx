import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
interface FilterBundleProps {
  genreFilter: string[];
  setGenreFilter: Dispatch<SetStateAction<string[]>>;
  ratingFilter: string;
  setRatingFilter: Dispatch<SetStateAction<string>>;
  releaseStartFilter: string;
  setReleaseStartFilter: Dispatch<SetStateAction<string>>;
  releaseEndFilter: string;
  setReleaseEndFilter: Dispatch<SetStateAction<string>>;
}

export default function Filters({
  genreFilter,
  setGenreFilter,
  ratingFilter,
  setRatingFilter,
  releaseStartFilter,
  setReleaseStartFilter,
  releaseEndFilter,
  setReleaseEndFilter,
}: FilterBundleProps) {
  return (
    <>
      <Grid2 container>
        <Grid2 xs={8} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Filters</Typography>
        </Grid2>
        <Grid2 xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* Add a show only if filters selected */}
          <Button>Clear</Button>
        </Grid2>
      </Grid2>
      <Grid2 sx={{ marginTop: "1rem" }}>
        {/* <Typography sx={{ fontWeight: "bold" }}>Genre</Typography> */}
        <GenreSelect
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
        />
      </Grid2>
    </>
  );
}

const genres = ["Comedy", "Action", "Horror"];

function getSelected(genre: string, selectedGenres: readonly string[]) {
  console.log(genre);
  console.log(selectedGenres);

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
  console.log(genreFilter);
  console.log(setGenreFilter);

  const handleChange = (event: SelectChangeEvent<typeof genreFilter>) => {
    //get the value of the select component
    const value = event.target.value;
    //set genreFilter to equal the value
    setGenreFilter(
      // On autofill we get a stringified value, split it or use the array that was received (MUI suggests this).
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          multiple
          value={genreFilter}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Genre" />}
          // renderValue={(selected) => (
          //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          //     {selected.map((value) => (
          //       <Chip key={value} label={value} />
          //     ))}
          //   </Box>
          // )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 224,
                width: 250,
              },
            },
          }}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre}
              value={genre}
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
