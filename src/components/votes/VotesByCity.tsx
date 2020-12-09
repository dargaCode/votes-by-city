import React from "react";
import styles from "./VotesByCity.module.scss";
import VoteForm from "./VoteForm";
import { VoteBundle } from "./voteUtils";

export default class VotesByCity extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  handleFormSubmit = (voteBundles: VoteBundle[]): void => {
    console.log(voteBundles);

    // look up the id from the api, then process

    // update city counts
    // update state
  };

  render(): JSX.Element {
    return (
      <div className={styles.container}>
        <h1>Votes by City</h1>

        <VoteForm onSubmit={this.handleFormSubmit} />

        {/* render this.state.cities summary */}
      </div>
    );
  }
}
