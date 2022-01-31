import { AnyAction } from "redux";
import { StoreState } from "../types/store";

export const initialState: StoreState = {
  result: null,
  view: "",
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "LOAD":
      return { ...state, result: action.result };

    case "VIEW_CHANGE_CHART_TYPE":
      return { ...state, view: action.chartType };

    default:
      return state;
  }
};
