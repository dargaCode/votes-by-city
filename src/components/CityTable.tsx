import React from "react";
import { CityRow } from "./voteUtils";
import styles from "./CityTable.module.scss";

interface Props {
  rows: CityRow[];
}

const HEADER_ROW = (
  <thead className={styles.header}>
    <tr>
      <td>City</td>
      <td>State</td>
      <td>Count</td>
    </tr>
  </thead>
);

const BLANK_ROW = (
  <tr key="1">
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
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
    <div className={styles.tableWrapper}>
      <table>
        {HEADER_ROW}
        <tbody>{tableRows.length ? tableRows : BLANK_ROW}</tbody>
      </table>
    </div>
  );
}
