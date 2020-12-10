import React from "react";

const CONFIRM_MESSAGE =
  "Are you sure you want to permanently delete all saved data?";
const WARNING_EMOJI = (
  <span role="img" aria-label="warning">
    ⚠️
  </span>
);

interface Props {
  onClearData: () => void;
}

export default function ClearDataButton(props: Props): JSX.Element {
  const handleClick = (): void => {
    const { onClearData } = props;

    // todo use a real modal
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(CONFIRM_MESSAGE);

    if (confirmed) {
      onClearData();
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      {WARNING_EMOJI}️ Clear all Data {WARNING_EMOJI}
    </button>
  );
}
