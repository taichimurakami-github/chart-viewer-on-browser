export interface State {
  counter: number;
  message: string;
}

export const initialState: State = {
  counter: 0,
  message: "",
};

export const reducer = (state: State, action: { type: string }) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter--,
        message: "INCREMENT",
      };

    case "DECREMENT":
      return {
        counter: state.counter--,
        message: "DECREMENT",
      };

    default:
      return state;
  }
};
