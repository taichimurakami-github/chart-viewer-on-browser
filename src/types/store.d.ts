import { resultData } from "./data";

export type StoreState = {
  result: null | resultData;
  view: "" | "001" | "002" | "003" | "010";
};
