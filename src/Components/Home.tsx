import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Link,
  Typography,
  IconButton
} from "@mui/material";
import React from "react";
import { TVShow } from "../utils";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';



const Home = ({ moviesData,isLoading }: { moviesData: TVShow[],isLoading:boolean }) => {
    const scrollToTop = ():void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    if (isLoading) {
        return( 
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
      }

    if (moviesData.length === 0 && !isLoading) {
        return( 
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh" >
            <Typography color='yellow'>No Data Available</Typography>
          </Box>
        );
      }
  return (
    <Container sx={{ py: "150px" }}>
      <Box
        rowGap={3}
        columnGap={4}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {moviesData.map((movie: TVShow) => {
          return (
            <Link href={movie?.url} key={movie?.id} sx={{textDecoration:"none"}}>
            <Card
              
              sx={{
                border: "6px solid white",
                borderRadius: "10px",
                transition: "border-color 0.3s ease-in-out, transform 0.3s ease-in-out",
                ":hover": {
                  borderColor: "green",
                  transform: "scale(1.05)"
                },
              }}
            >
              <CardMedia
                component="img"
                height="370"
                image={movie?.image?.original}
                alt={movie.name}
              />
              <CardContent>
                <Typography variant="h6">{movie.name}</Typography>
                <Typography variant="h6">language:- {movie?.language}</Typography>
              </CardContent>
            </Card>
            </Link>
          );
        })}
      </Box>
      {/* Scroll to Top Icon */}
      <IconButton
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#3f51b5',
          color: 'white',
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </Container>
  );
};

export default Home;
