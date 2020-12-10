// extend this when there are no indexed keys on the object
// otherwise it won't be possible to index in by variable (e.g. obj[var])
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

export interface ZipCodeVotesSimple {
  [zipCode: string]: {
    votes: number;
  };
}

export interface ZipCodeVotesProcessed extends ZipCodeVotesSimple {
  [zipCode: string]: {
    votes: number;
    city: string;
    state: string;
  };
}

interface ApiPlace {
  "place name": string;
  city: string;
  state: string;
}

export interface ParsedApiJson {
  "post code": string;
  places: ApiPlace[];
}

export interface LocationData {
  zipCode: string;
  city: string;
  state: string;
}
