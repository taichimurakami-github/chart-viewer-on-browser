import "./App.css";
import { View } from "./components/View";
import { useSelector } from "react-redux";
import { InputFile } from "./components/InputFile";
import { State } from "./types/store";
import { useEffect } from "react";

function App(props: any) {
  const resultData = useSelector((state: State) => state.result?.axisNames);

  console.log(resultData);
  return (
    <div className="App">
      <View />
      <InputFile />
    </div>
  );
}

// const mapStateToProps = (state: State) => {
//   return state;
// };

// const connector = connect(mapStateToProps);
// type PropsFromRedux = ConnectedProps<typeof connector>;

export default App;

// export default connector(App);
