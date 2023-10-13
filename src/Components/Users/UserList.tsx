import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { User, UserListProps } from "./Users.Interface";

const UsersList: React.FC<UserListProps> = ({
  isUserLoading,
  userDetails,
  handleOpen,
  handleOpenDeleteModal,
}) => {
  if (isUserLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="baseline"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  } else if (userDetails?.Users.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          No Users Found
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box
        rowGap={3}
        columnGap={4}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
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
              flexDirection: "row",
              justifyContent: "space-between",
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
    );
  }
};

export default UsersList;
