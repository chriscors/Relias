import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function MovieCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Grid2 container sx={{ flexDirection: "column" }}>
          <Typography gutterBottom variant="h5" component="div">
            Movie Title
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Movie Rating
          </Typography>
        </Grid2>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
}
