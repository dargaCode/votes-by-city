import React from "react";
import ReactDOM from "react-dom";

function App(): JSX.Element {
  return (
    <div className="container">
      <h1>Votes by City</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
