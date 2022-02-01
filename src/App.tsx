import "./App.css";
import { ViewHandler } from "./components/ViewHandler";
import { InputFile } from "./components/InputFile";
import { Menu } from "./components/Menu";

function App() {
  return (
    <div className="App">
      <Menu />
      <ViewHandler />
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
