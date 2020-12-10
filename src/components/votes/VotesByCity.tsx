import React from "react";
import { ZipCodeVotes, VoteBundle } from "./voteUtils";
import styles from "./VotesByCity.module.scss";
import VoteForm from "./VoteForm";

interface State {
  zipCodeVotes: ZipCodeVotes;
}

const INITIAL_STATE: State = {
  zipCodeVotes: {},
};

export default class VotesByCity extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidMount(): void {
    this.loadStateFromLocalStorage();
  }

  loadStateFromLocalStorage = (): void => {
    const savedState = localStorage.getItem("state");

    this.setState(JSON.parse(savedState as string));
  };

  saveStateToLocalStorage = (): void => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  getZipCodeVotes = (voteBundles: VoteBundle[]): ZipCodeVotes => {
    // eslint-disable-next-line react/destructuring-assignment
    const zipCodeVotes = { ...this.state.zipCodeVotes };

    voteBundles.forEach(bundle => {
      const { zipCode, addedVotes } = bundle;
      const voteCount = Number(addedVotes);

      if (!zipCodeVotes[zipCode]) {
        zipCodeVotes[zipCode] = { votes: voteCount };
      } else {
        zipCodeVotes[zipCode].votes += voteCount;
      }
    });

    return zipCodeVotes;
  };

  handleFormSubmit = (voteBundles: VoteBundle[]): void => {
    const zipCodeVotes = this.getZipCodeVotes(voteBundles);

    console.log(zipCodeVotes);

    this.setState(prevState => {
      return { ...prevState, zipCodeVotes };
    }, this.saveStateToLocalStorage);

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
