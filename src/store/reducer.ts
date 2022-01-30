import { AnyAction } from "redux";
import { StoreState } from "../types/store";

export const initialState: StoreState = {
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
