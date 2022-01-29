import { combineReducers, createStore, Store } from "redux";
import { reducer, State } from "./reducer";

type storeState = {
  state: State;
};

const store: Store = createStore(combineReducers<storeState>(reducer));

export { store };
