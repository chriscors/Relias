import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "../App.css";

export default function MovieCard() {
  return (
    <Grid2>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 340 }}
          image="https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg"
          className="description"
        >
          <Grid2
            container
            sx={{
              display: { xs: "none" },
              height: "100%",
              alignItems: "center",
              transition: "display 1s ease-in-out",
            }}
          >
            <Typography
              variant="body"
              color="text"
              sx={{
                textAlign: "center",
                margin: "1rem",
              }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reiciendis dolore asperiores molestias dolores ratione voluptatem
              repudiandae eaque, optio deleniti architecto maxime id provident,
              officia suscipit sint aspernatur alias. Obcaecati, et! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Ab vel fugiat dolorum
              distinctio optio rerum? Asperiores consectetur pariatur id
              adipisci dignissimos eius porro cumque laudantium magnam
              voluptatum ducimus, nostrum ratione.
            </Typography>
          </Grid2>
        </CardMedia>
        <CardContent>
          <Grid2 container>
            <Grid2 xs={9}>
              <Typography gutterBottom variant="h5" component="div">
                Movie Title
              </Typography>
            </Grid2>
            <Grid2 xs={3}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textAlign: "right" }}
              >
                Rating
              </Typography>
            </Grid2>
          </Grid2>
          <Typography variant="body2" color="text.secondary">
            2023
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}
