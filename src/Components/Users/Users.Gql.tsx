import { gql } from "@apollo/client";

export const GET_USERS = gql`
query GET_USERS($payload: Users_bool_exp = {}) {
  Users(order_by: { created_at: desc }, where: $payload) {
    id
    user_name
    first_name
    last_name
    age
    phone
  }
}
`;
export const getCombinedRoledAndStatus = gql`
{
  Roles {
    role_name
    id
  }
  Status {
    status_value
    id
  }
}
`;