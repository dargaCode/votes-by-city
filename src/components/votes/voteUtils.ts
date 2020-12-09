interface Indexable {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

export interface VoteBundle extends Indexable {
  zipCode: string;
  addedVotes: number | null;
}

export const DEFAULT_VOTE_BUNDLE: VoteBundle = {
  zipCode: "",
  addedVotes: null
};

export interface ZipCodeVotes {
  [zipCode: string]: {
    votes: number;
  };
}
