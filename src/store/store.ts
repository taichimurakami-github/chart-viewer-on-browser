import { combineReducers, createStore, Store } from "redux";
import { State } from "../types/store";
import { reducer } from "./reducer";

export type storeState = {
  state: State;
};

const store: Store = createStore(
  combineReducers<storeState>({
    state: reducer,
  })
);

export { store };
