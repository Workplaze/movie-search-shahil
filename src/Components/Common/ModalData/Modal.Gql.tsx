import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
query GET_USER_BY_ID($id: uuid!) {
  Users_by_pk(id: $id) {
    last_name
    first_name
    age
    phone
    user_name
    getStatusById {
      id
      status_value
    }
    getRoleById {
      id
      role_name
    }
  }
}
`;
export const CREATE_OR_UPDATE_USER = gql`
mutation UpsertUser($id: uuid, $input: Users_insert_input!) {
  insert_Users_one(
    object: $input
    on_conflict: {
      constraint: Users_pkey
      update_columns: [
        last_name
        first_name
        age
        phone
        user_name
        role_id
        status_id
      ]
    }
  ) {
    id
    last_name
    first_name
    age
    phone
    user_name
    role_id
    status_id
  }
}
`;