import React from "react";
import { CityRow } from "./voteUtils";

interface Props {
  rows: CityRow[];
}

const HEADER_ROW = (
  <thead>
    <tr>
      <td>City</td>
      <td>State</td>
      <td>Count</td>
    </tr>
  </thead>
);

export default function CityTable(props: Props): JSX.Element {
  const { rows } = props;
  const tableRows = rows.map(row => {
    const { city, state, votes } = row;
    const key = city + state;

    return (
      <tr key={key}>
        <td>{city}</td>
        <td>{state}</td>
        <td>{votes}</td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        {HEADER_ROW}
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
