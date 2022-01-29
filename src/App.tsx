import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { View } from "./components/View";
import { Store } from "redux";
import { connect } from "react-redux";

function App(props: Store) {
  return (
    <div className="App">
      <View />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { count: state.count };
};

export default connect(mapStateToProps)(App);

// export default App;
