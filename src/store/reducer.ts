import { AnyAction } from "redux";
import { State } from "../types/store";

export const initialState: State = {
  result: null,
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "LOAD":
      return { ...state, resultData: action.data };

    default:
      return state;
  }
};
