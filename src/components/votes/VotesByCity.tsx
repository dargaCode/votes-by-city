import React from "react";
import styles from "./VotesByCity.module.scss";

export default class VotesByCity extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  handleFormSubmit = (formValues: { [name: string]: string }): void => {
    console.log(formValues);

    // look up the id from the api, then process

    // update city counts
    // update state
  };

  render(): JSX.Element {
    return (
      <div>
        Add the votes!
        {/* render form */}
        {/* render this.state.cities summary */}
      </div>
    );
  }
}
