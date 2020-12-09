import React from "react";
import { VoteBundle, DEFAULT_VOTE_BUNDLE } from "./voteUtils";

interface Props {
  onSubmit: (voteBundles: VoteBundle[]) => void;
}

interface State {
  inputGroups: VoteBundle[];
}

export default class VoteForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputGroups: [{ ...DEFAULT_VOTE_BUNDLE }]
    };
  }

  getInputGroups = (voteBundles: VoteBundle[]): JSX.Element[] => {
    return voteBundles.map((bundle, i) => {
      const key = `bundle${i}`;
      const zipCodeId = `${key}zipCode`;
      const addedVotesId = `${key}addedVotes`;

      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={key}>
          <label htmlFor={zipCodeId}>
            ZipCode:
            <input
              id={zipCodeId}
              // it will be easier to key into name since it has no appended index
              name="zipCode"
              type="text"
              value={bundle.zipCode}
              onChange={this.handleChange}
              // custom attributes
              bundle-index={i}
            />
          </label>

          <label htmlFor={addedVotesId}>
            Votes to Add:
            <input
              id={addedVotesId}
              // it will be easier to key into name since it has no appended index
              name="addedVotes"
              type="number"
              value={bundle.addedVotes || ""}
              onChange={this.handleChange}
              // custom attributes
              bundle-index={i}
            />
          </label>
        </div>
      );
    });
  };

  addInputGroup = (): void => {
    this.setState(prevState => {
      const newState = { ...prevState };

      newState.inputGroups.push({ ...DEFAULT_VOTE_BUNDLE });

      return newState;
    });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { currentTarget: target } = event;
    // name doesn't have an index appended like id does, so it's easier to parse
    const { name, value } = target;
    const index = Number(target.getAttribute("bundle-index"));

    this.setState(prevState => {
      const newState = { ...prevState };

      newState.inputGroups[index][name] = value;

      return newState;
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { inputGroups } = this.state;

    /* build a map:
     * zipCodes: {
     *   94063: 100,
     *   94061: 200
     * }
     *
     * */

    onSubmit(inputGroups);
  };

  render(): JSX.Element {
    const { inputGroups } = this.state;

    return (
      <div>
        <button type="button" onClick={this.addInputGroup}>
          Add Row
        </button>
        <form onSubmit={this.handleSubmit}>
          {this.getInputGroups(inputGroups)}

          <input type="submit" />
        </form>
      </div>
    );
  }
}
