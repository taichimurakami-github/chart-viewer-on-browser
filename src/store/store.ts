import { combineReducers, compose, createStore, Store } from "redux";
import { StoreState } from "../types/store";
import { reducer } from "./reducer";

export type storeState = {
  state: StoreState;
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store = createStore(
  combineReducers<storeState>({
    state: reducer,
  }),
  composeEnhancers()
);

export { store };
