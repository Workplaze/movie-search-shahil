import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import ModalData from "../Common/ModalData/ModalData";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteModal from "../Common/DeleteModal/DeleteModal";
import { Payload, roleAndStatusType } from "./Users.Interface";
import { GET_USERS, getCombinedRoledAndStatus } from "./Users.Gql";
import UsersList from "./UserList";
import { FilterUsers } from "../../FilterUsers";

const Users = () => {
  const { state, dispatch } = useContext(FilterUsers)!;

  const [openForm, setOpenForm] = useState<boolean>(false);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [id, setId] = useState<string>("");

  const handleCloseForm = (): void => {
    setOpenForm(false);
    setId("");
  };

  const handleCloseDeleteModal = (): void => {
    setId("");
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

  const handlePayload = (): { payload: Payload } => {
    let requiredPayload: { payload: Payload } = {
      payload: {
        role_id: { _eq: state?.rolesValue },
        status_id: { _eq: state?.statusValue },
        _or: [
          { user_name: { _ilike: `%${state?.searchValue}%` } },
          { first_name: { _ilike: `%${state?.searchValue}%` } },
          { last_name: { _ilike: `%${state?.searchValue}%` } },
        ],
      },
    };
    if (!state.rolesValue) {
      delete requiredPayload.payload.role_id;
    }
    if (!state?.statusValue) {
      delete requiredPayload.payload.status_id;
    }
    return requiredPayload;
  };

  const handleRolesChange = (value: string) => {
    dispatch({ type: "UPDATE_ROLES", payload: value });
  };
  const handleStatusChange = (value: string) => {
    dispatch({ type: "UPDATE_STATUS", payload: value });
  };
  const handleSearchUser = (value: string) => {
    dispatch({ type: "UPDATE_SEARCH", payload: value });
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { loading: isStatusRoleLoading, data: statusRoleData } = useQuery(
    getCombinedRoledAndStatus
  );

  const [
    getUserDetails,
    { loading: isUserLoading, error, data: userDetails, refetch },
  ] = useLazyQuery(GET_USERS);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getUserDetails({
        variables: handlePayload(),
      });
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
    //eslint-disable-next-line
  }, [state]);

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
          backgroundColor: "white",
          p: 2,
        }}
        columnGap={4}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(5, 1fr)",
        }}
      >
        <TextField
          label="Search User"
          variant="outlined"
          type="text"
          color="primary"
          value={state?.searchValue}
          onChange={(event) => {
            handleSearchUser(event.target.value);
          }}
        />
        <Autocomplete
          disablePortal
          loading={isStatusRoleLoading}
          id="combo-box-demo"
          options={statusRoleData?.Status.map(
            (status: { status_value: string; id: string }) => {
              return {
                label: status.status_value,
                value: status.id,
              };
            }
          )}
          onChange={(event, value: roleAndStatusType | null) => {
            value?.value
              ? handleStatusChange(value?.value)
              : handleStatusChange("");
          }}
          renderInput={(params) => (
            <TextField {...params} label="Status" name="status" />
          )}
        />
        <Autocomplete
          disablePortal
          loading={isStatusRoleLoading}
          id="combo-box-demo"
          options={statusRoleData?.Roles.map(
            (role: { role_name: string; id: string }) => {
              return {
                label: role.role_name,
                value: role.id,
              };
            }
          )}
          onChange={(event, value: roleAndStatusType | null) => {
            value?.value
              ? handleRolesChange(value?.value)
              : handleRolesChange("");
          }}
          renderInput={(params) => (
            <TextField {...params} label="Role" name="Role" />
          )}
        />
        <Button
          sx={{ my: "15px", backgroundColor: "green" }}
          variant="contained"
          onClick={handleOpenCreateModal}
        >
          Add User
        </Button>
      </Box>
      <UsersList
        isUserLoading={isUserLoading}
        userDetails={userDetails}
        handleOpen={handleOpen}
        handleOpenDeleteModal={handleOpenDeleteModal}
      />

      <ModalData
        open={openForm}
        handleClose={handleCloseForm}
        id={id}
        refetchUser={refetch}
        statusRoleData={statusRoleData}
        isStatusRoleLoading={isStatusRoleLoading}
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
