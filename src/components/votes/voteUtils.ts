interface Dict {
  [name: string]: string | (number | null);
}

export interface VoteBundle extends Dict {
  zipCode: string;
  addedVotes: number | null;
}

export const DEFAULT_VOTE_BUNDLE: VoteBundle = {
  zipCode: "",
  addedVotes: null
};
