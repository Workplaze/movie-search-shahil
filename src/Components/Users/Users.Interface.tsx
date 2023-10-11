export interface User {
  last_name: string;
  first_name: string;
  age: string;
  id: string;
  phone: string;
  user_name: string;
  __typename: string;
}

export interface Payload {
  role_id?: { _eq: string };
  status_id?: { _eq: string };
  _or?: Array<{ [key: string]: { _ilike: string } }>;
}

export type roleAndStatusType = {
  label: string;
  value: string;
};
export interface UserDetails {
    Users: User[];
  }
  
export  interface UserListProps {
    isUserLoading: boolean;
    userDetails: UserDetails | null;
    handleOpen: (userId: string) => void;
    handleOpenDeleteModal: (userId: string) => void;
  }
