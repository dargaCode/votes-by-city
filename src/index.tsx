import React from "react";
import ReactDOM from "react-dom";
import VotesByCity from "./components/VotesByCity";
import "./config/_general.scss";

function App(): JSX.Element {
  return <VotesByCity />;
}

ReactDOM.render(<App />, document.getElementById("root"));
