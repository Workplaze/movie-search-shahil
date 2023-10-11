import { ToastOptions } from "react-hot-toast";
import { ReactNode, Dispatch } from "react";

export interface TVShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string;
  };
  webChannel: null | string;
  dvdCountry: null | string;
  externals: {
    tvrage: number;
    thetvdb: number;
    imdb: string;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
  };
}

export const toastoptions: ToastOptions = {
  duration: 3000,
  position: "top-right",
};

export interface State {
  rolesValue: string;
  statusValue: string;
  searchValue: string;
}

export interface Action {
  type: string;
  payload?: any;
}

export type MyDispatch = Dispatch<Action>;

export const initialState: State = {
  rolesValue: "",
  statusValue: "",
  searchValue: "",
};

export interface ContextProps {
  state: State;
  dispatch: MyDispatch;
}

export interface MyProviderProps {
  children: ReactNode;
}
