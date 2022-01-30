import "./App.css";
import { View } from "./components/View";
import { InputFile } from "./components/InputFile";

function App(props: any) {
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
