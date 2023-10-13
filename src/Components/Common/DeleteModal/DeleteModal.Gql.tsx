import { gql } from "@apollo/client";

export const DELETE_USER = gql`
mutation DeleteUser($id: uuid!) {
  delete_Users_by_pk(id: $id) {
    id
  }
}
`;