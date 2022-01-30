import { useSelector } from "react-redux";
import { StoreState } from "../types/store";

export const View = () => {
  const result = useSelector((arg: { state: StoreState }) => arg.state.result);
  console.log(result);

  return (
    <>
      <p>View Component</p>
      {result ? <p>loaded</p> : <p>no data</p>}
    </>
  );
};
