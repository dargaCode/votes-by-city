import React from "react";
import ReactDOM from "react-dom";
import VotesByCity from "./components/votes/VotesByCity";
import "./config/_general.scss";

function App(): JSX.Element {
  return (
    <div className="container">
      <h1>Votes by City</h1>
      <VotesByCity />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
