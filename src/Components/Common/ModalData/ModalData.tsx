import React, { useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { toastoptions } from "../../../utils";
import { MyDialogProps, UserData, UserDataPayload } from "./Modal.Interface";
import { validationSchema } from "./utils";
import { CREATE_OR_UPDATE_USER, GET_USER_BY_ID } from "./Modal.Gql";



const ModalData: React.FC<MyDialogProps> = ({
  open,
  handleClose,
  id,
  refetchUser,
  statusRoleData,
  isStatusRoleLoading
}) => {

  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id || !open, // Skip the query when id is not present
  });

  const [createOrUpdateUser, { loading: formLoading }] = useMutation(
    CREATE_OR_UPDATE_USER
  );

  const formik = useFormik<UserData>({
    initialValues: {
      last_name: "",
      first_name: "",
      age: "",
      phone: "",
      user_name: "",
      role: {
        label: "",
        value: "",
      },
      status: {
        label: "",
        value: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload: UserDataPayload = {
        id,
        last_name: values?.last_name,
        first_name: values?.first_name,
        age: values?.age,
        phone: values?.phone,
        user_name: values?.user_name,
        role_id: values?.role?.value,
        status_id: values?.status?.value,
      };
      if (!id) {
        delete payload.id;
      }
      try {
        await createOrUpdateUser({
          variables: {
            input: payload,
          },
        });
        const successMessage: string = id
          ? "Updated user successfully"
          : "Created user successfully";
        toast.success(successMessage, toastoptions);
        await refetchUser();
        handleClose();
        resetForm();
      } catch (error: any) {
        toast.error(error.message, toastoptions);
        console.log(error.message);
      }
    },
  });
  const formikRef = useRef(formik);

  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  useEffect(() => {
    formikRef.current.resetForm();
    if (id) {
      refetch({ id });
    }
  }, [id, refetch]);

  useEffect(() => {
    const handleFormValues = (): void => {
      formikRef.current.setFieldValue(
        "last_name",
        data?.Users_by_pk?.last_name
      );
      formikRef.current.setFieldValue(
        "first_name",
        data?.Users_by_pk?.first_name
      );
      formikRef.current.setFieldValue("age", data?.Users_by_pk?.age);
      formikRef.current.setFieldValue("phone", data?.Users_by_pk?.phone);
      formikRef.current.setFieldValue(
        "user_name",
        data?.Users_by_pk?.user_name
      );
      formikRef.current.setFieldValue("role", {
        label: data?.Users_by_pk?.getRoleById?.role_name,
        value: data?.Users_by_pk?.getRoleById?.id,
      });
      formikRef.current.setFieldValue("status", {
        label: data?.Users_by_pk?.getStatusById?.status_value || "",
        value: data?.Users_by_pk?.getStatusById?.id || "",
      });
    };

    if (data && id) {
      handleFormValues();
    }
  }, [id, data]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6" color="error">
          An error occurred: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{id ? "Update User" : "Create User"}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              name="user_name"
              label="User Name"
              variant="outlined"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.user_name}
              error={
                formik.touched.user_name && Boolean(formik.errors.user_name)
              }
              helperText={formik.touched.user_name && formik.errors.user_name}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              name="first_name"
              label="First Name"
              type="text"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              name="last_name"
              label="Last Name"
              variant="outlined"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
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
              value={formik.values.role}
              onChange={(event, value) => {
                formik.setFieldValue("role", value || { label: "", value: "" });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Role" name="role" />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
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
              value={formik.values.status}
              onChange={(event, value) => {
                formik.setFieldValue(
                  "status",
                  value || { label: "", value: "" }
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Status" name="status" />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              name="age"
              label="Age"
              variant="outlined"
              type="number"
              onChange={(e) => {
                if (e.target.value.length <= 3) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              type="number"
              inputProps={{ maxLength: 10 }}
              onChange={(e) => {
                if (String(e.target.value).length <= 10) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </FormControl>

          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={formLoading}
            >
              {id ? "Update User" : "Create User"}
            </Button>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalData;
