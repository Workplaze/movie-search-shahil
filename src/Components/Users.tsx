import React, { useEffect, useState } from "react";
import {  gql, useLazyQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  IconButton,
  TextField,
} from "@mui/material";
import ModalData from "./Common/ModalData";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteModal from "./Common/DeleteModal";

const Users = () => {
  interface User {
    last_name: string;
    first_name: string;
    age: string;
    id: string;
    phone: string;
    user_name: string;
    __typename: string;
  }

  // const GET_USERS = gql`
  //   query GET_USERS {
  //     Users(order_by: { created_at: desc }) {
  //       last_name
  //       first_name
  //       age
  //       id
  //       phone
  //       user_name
  //     }
  //   }
  // `;

  // const { loading, error, data: userDetails, refetch } = useQuery(GET_USERS);
  const GET_USERS = gql`
    query GET_USERS($searchTerm: String) {
      Users(
        order_by: { created_at: desc }
        where: {
          _or: [
            { user_name: { _ilike: $searchTerm } }
            { first_name: { _ilike: $searchTerm } }
            { last_name: { _ilike: $searchTerm } }
          ]
        }
      ) {
        last_name
        first_name
        age
        id
        phone
        user_name
      }
    }
  `;
  const [searchValue, setSearchValue] = useState<string>("");

  const [getUsers, { loading, error, data: userDetails, refetch }] =
    useLazyQuery(GET_USERS);

  const handleSearch = () => {
    getUsers({ variables: { searchTerm: `%${searchValue}%` } });
  };

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const handleCloseForm = (): void => {
    setOpenForm(false);
  };
  const handleCloseDeleteModal = (): void => {
    setOpenDeleteModal(false);
  };
  const handleOpen = (userId: string): void => {
    setId(userId);
    setOpenForm(true);
  };
  const handleOpenCreateModal = (): void => {
    setId("");
    setOpenForm(true);
  };
  const handleOpenDeleteModal = (userId: string): void => {
    setId(userId);
    setOpenDeleteModal(true);
  };
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
      console.log("API call with value:", searchValue);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          An error occurred: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: "150px" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          backgroundColor: "white",
          alignItems: "center",
          px: 2,
        }}
      >
        <TextField
          label="Search User"
          variant="outlined"
          type="text"
          color="primary"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
        <Button
          sx={{ my: "15px", backgroundColor: "green" }}
          variant="contained"
          onClick={handleOpenCreateModal}
        >
          Add User
        </Button>
      </Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="baseline"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          rowGap={3}
          columnGap={4}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(1, 1fr)",
          }}
        >
          {userDetails?.Users.map((user: User) => (
            <Card
              key={user.id}
              sx={{
                marginBottom: "16px",
                backgroundColor: "#333",
                color: "white",
                display: "flex",
                flexDirection: "row", // Align items horizontally
                justifyContent: "space-between", // Align items with space in between
              }}
            >
              <CardContent>
                <Typography variant="body1">{`User Name: ${user?.user_name}`}</Typography>
                <Typography variant="body1">{`First Name: ${user?.first_name}`}</Typography>
                <Typography variant="body2">{`Last Name: ${user?.last_name}`}</Typography>
                <Typography variant="body2">{`Age: ${user?.age}`}</Typography>
                <Typography variant="body2">{`Phone: ${user?.phone}`}</Typography>
              </CardContent>
              <CardActions sx={{ marginTop: "auto" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleOpen(user.id);
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleOpenDeleteModal(user.id);
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
      <ModalData
        open={openForm}
        handleClose={handleCloseForm}
        id={id}
        refetchUser={refetch}
      />
      <DeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        id={id}
        updateUser={refetch}
      />
      <IconButton
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#3f51b5",
          color: "white",
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </Container>
  );
};

export default Users;
