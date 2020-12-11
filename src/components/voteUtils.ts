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

interface CityVotes {
  [cityId: string]: {
    city: string;
    state: string;
    votes: number;
  };
}

// aggregate processed locations into a dict of votes by location
export function getCityVotes(
  processedZipCodes: ZipCodeVotesProcessed
): CityVotes {
  const cityVotes: CityVotes = {};
  const zipCodeEntries = Object.entries(processedZipCodes);

  zipCodeEntries.forEach(zipCodeEntry => {
    // don't need to use the zipCode key from the entry
    const { votes, city, state } = zipCodeEntry[1];
    const cityKey = `${city},${state}`;

    if (cityVotes[cityKey]) {
      cityVotes[cityKey].votes += votes;
    } else {
      cityVotes[cityKey] = {
        votes,
        city,
        state
      };
    }
  });

  return cityVotes;
}

export interface CityRow {
  city: string;
  state: string;
  votes: number;
}

function DescendingVotesComparator(a: CityRow, b: CityRow): number {
  return b.votes - a.votes;
}

// get an array of city stat objects
export function getDescendingCityRows(cityVotes: CityVotes): CityRow[] {
  const cityEntries = Object.entries(cityVotes);
  const cityRows = cityEntries.map(cityEntry => cityEntry[1]);

  return cityRows.sort(DescendingVotesComparator);
}
