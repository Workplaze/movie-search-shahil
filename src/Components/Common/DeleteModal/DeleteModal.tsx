import { useMutation } from "@apollo/client";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { toastoptions } from "../../../utils";
import { deleteModalType } from "./DeleteModal.Interface";
import { DELETE_USER } from "./DeleteModal.Gql";


const DeleteModal = ({ open, handleClose, id, updateUser }: deleteModalType) => {

  const [deleteUserMutation,{loading:isDeleteUserLoading}] = useMutation(DELETE_USER);
  
  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation({
        variables: { id },
      });
      toast.success("User deleted successfully", toastoptions);

      await updateUser();
  
      handleClose();
    } catch (error:any) {
      toast.error(error, toastoptions);
      console.error("Error deleting user:", error);
    }
  }; 
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this user?
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
          disabled={isDeleteUserLoading}
            onClick={handleDeleteUser}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
