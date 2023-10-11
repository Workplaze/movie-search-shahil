import React, { createContext, useReducer } from "react";
import {
  Action,
  ContextProps,
  MyProviderProps,
  State,
  initialState,
} from "./utils";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_ROLES":
      return { ...state, rolesValue: action.payload };
    case "UPDATE_STATUS":
      return { ...state, statusValue: action.payload };
    case "UPDATE_SEARCH":
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
};

const FilterUsers = createContext<ContextProps | undefined>(undefined);

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FilterUsers.Provider value={{ state, dispatch }}>
      {children}
    </FilterUsers.Provider>
  );
};

export { FilterUsers, MyProvider };
