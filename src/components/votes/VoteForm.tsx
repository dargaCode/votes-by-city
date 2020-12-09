import React from "react";
import { VoteBundle, DEFAULT_VOTE_BUNDLE } from "./voteUtils";

interface Props {
  onSubmit: (voteBundles: VoteBundle[]) => void;
}

interface State {
  inputGroups: VoteBundle[];
}

const INDEX_ATTRIBUTE = "bundle-index";

// generate a spreadable react attribute for index attribute, to prevent typos
function getBundleIndexProp(
  index: number
): { [INDEX_ATTRIBUTE: string]: number } {
  return {
    [INDEX_ATTRIBUTE]: index
  };
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
              maxLength={5}
              value={bundle.zipCode}
              required
              onChange={this.handleChange}
              // custom attributes
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getBundleIndexProp(i)}
            />
          </label>

          <label htmlFor={addedVotesId}>
            Votes to Add:
            <input
              id={addedVotesId}
              // it will be easier to key into name since it has no appended index
              name="addedVotes"
              type="number"
              min="0"
              value={bundle.addedVotes || ""}
              required
              onChange={this.handleChange}
              // custom attributes
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getBundleIndexProp(i)}
            />
          </label>

          {/* don't allow the first row to be removed */}
          {i > 0 && (
            <button
              type="button"
              onClick={this.removeInputGroup}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getBundleIndexProp(i)}
            >
              x
            </button>
          )}
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

  removeInputGroup = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { currentTarget: target } = event;
    const index = Number(target.getAttribute(INDEX_ATTRIBUTE));

    this.setState(prevState => {
      const newState = { ...prevState };

      newState.inputGroups.splice(index, 1);

      return newState;
    });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { currentTarget: target } = event;
    // name doesn't have an index appended like id does, so it's easier to parse
    const { name, value } = target;
    const index = Number(target.getAttribute(INDEX_ATTRIBUTE));

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
