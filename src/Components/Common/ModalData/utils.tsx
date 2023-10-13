import * as Yup from "yup";
export const validationSchema = Yup.object({
    last_name: Yup.string().required("Last name is required"),
    first_name: Yup.string().required("First name is required"),
    age: Yup.number().required("Age is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    user_name: Yup.string().required("User Name is required"),
    role: Yup.object().shape({
      label: Yup.string().required("Field is required."),
      value: Yup.string().required("Field is required."),
    }),
    status: Yup.object().shape({
      label: Yup.string().required("Field is required."),
      value: Yup.string().required("Field is required."),
    }),
  });