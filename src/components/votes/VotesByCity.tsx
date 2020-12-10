import React from "react";
import { VoteBundle, ZipCodeVotesSimple } from "./voteUtils";
import styles from "./VotesByCity.module.scss";
import VoteForm from "./VoteForm";
import ClearDataButton from "./ClearDataButton";

interface State {
  zipCodeVotes: ZipCodeVotesSimple;
}

const INITIAL_STATE: State = {
  zipCodeVotes: {}
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

  clearAllData = (): void => {
    localStorage.clear();

    this.setState(INITIAL_STATE);
  };

  // aggregate vote bundles into a dictionary by zipCode
  generateSimpleZipCodes = (voteBundles: VoteBundle[]): ZipCodeVotesSimple => {
    const zipCodeVotes: ZipCodeVotesSimple = {};

    voteBundles.forEach(bundle => {
      const { zipCode, addedVotes } = bundle;
      const voteCount = Number(addedVotes);

      if (zipCodeVotes[zipCode]) {
        zipCodeVotes[zipCode].votes += voteCount;
      } else {
        zipCodeVotes[zipCode] = { votes: voteCount };
      }
    });

    return zipCodeVotes;
  };

  handleFormSubmit = (newVoteBundles: VoteBundle[]): void => {
    const newZipCodeVotes = this.generateSimpleZipCodes(newVoteBundles);

    this.setState(prevState => {
      return {
        ...prevState,
        zipCodeVotes: newZipCodeVotes
      };
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

        <ClearDataButton onClearData={this.clearAllData} />
      </div>
    );
  }
}
