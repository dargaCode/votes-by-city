import React from "react";
import {
  VoteBundle,
  ZipCodeVotesSimple,
  ZipCodeVotesProcessed,
  ParsedApiJson,
  LocationData,
  CityRow,
  getCityVotes,
  getDescendingCityRows
} from "./voteUtils";
import styles from "./VotesByCity.module.scss";
import VoteForm from "./VoteForm";
import ClearDataButton from "./ClearDataButton";

interface State {
  zipCodeVotes: ZipCodeVotesProcessed;
  cityRows: CityRow[];
}

const INITIAL_STATE: State = {
  zipCodeVotes: {},
  cityRows: []
};
const ZIPCODE_API_PREFIX = `https://api.zippopotam.us/us/`;

// true if zipCode is already present and has a valid location
function isZipCodeFullyProcessed(
  zipCode: string,
  cache: ZipCodeVotesProcessed
): boolean {
  const cachedZipCode = cache[zipCode];

  if (!cachedZipCode) {
    return false;
  }

  const cityIsCached = cachedZipCode.city !== "";
  const stateIsCached = cachedZipCode.state !== "";

  return cityIsCached && stateIsCached;
}

// return a simple object with the zipCode, city, and state
function getLocationFromParsedApiJson(obj: ParsedApiJson): LocationData {
  const { "post code": zipCode, places } = obj;
  const { "place name": city, state } = places[0];

  return {
    zipCode,
    city,
    state
  };
}

// replace the cache's incomplete location data (by reference)
function cacheLocationData(
  cacheRef: ZipCodeVotesProcessed,
  locations: LocationData[]
): void {
  locations.forEach(location => {
    const { zipCode, city, state } = location;
    const cachedZipRef = cacheRef[zipCode];

    cachedZipRef.city = city;
    cachedZipRef.state = state;
  });
}

export default class VotesByCity extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidMount(): void {
    this.loadStateFromLocalStorage();
  }

  loadStateFromLocalStorage = (): void => {
    const savedState = localStorage.getItem("state");

    this.setState(JSON.parse(savedState as string));
  };

  saveStateToLocalStorage = (): void => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  clearAllData = (): void => {
    localStorage.clear();

    this.setState(INITIAL_STATE);
  };

  // aggregate vote bundles into a dictionary by zipCode
  generateSimpleZipCodes = (voteBundles: VoteBundle[]): ZipCodeVotesSimple => {
    const zipCodeVotes: ZipCodeVotesSimple = {};

    voteBundles.forEach(bundle => {
      const { zipCode, addedVotes } = bundle;
      const voteCount = Number(addedVotes);

      if (zipCodeVotes[zipCode]) {
        zipCodeVotes[zipCode].votes += voteCount;
      } else {
        zipCodeVotes[zipCode] = { votes: voteCount };
      }
    });

    return zipCodeVotes;
  };

  // get locations for the new votes, and aggregate into the dict from state
  processAllLocations = async (
    zipCodeVotes: ZipCodeVotesSimple
  ): Promise<ZipCodeVotesProcessed> => {
    // eslint-disable-next-line react/destructuring-assignment
    const processedZipCodes = { ...this.state.zipCodeVotes };
    const zipCodeEntries = Object.entries(zipCodeVotes);
    const locationRequests: Promise<Response>[] = [];

    zipCodeEntries.forEach(([zipCode, { votes }]) => {
      const isCached = isZipCodeFullyProcessed(zipCode, processedZipCodes);

      // no location request needed, just increment the vote total
      if (isCached) {
        processedZipCodes[zipCode].votes += votes;
      } else {
        // process and cache new zipCode
        locationRequests.push(fetch(ZIPCODE_API_PREFIX + zipCode));

        // placeholder location until the data is fetched
        processedZipCodes[zipCode] = { votes, city: "", state: "" };
      }
    });

    // all new votes were for zipCodes which had already been processed
    // no need for api calls
    if (!locationRequests.length) {
      return processedZipCodes;
    }

    try {
      const responses = await Promise.all(locationRequests);
      const jsonPromises = responses.map(response => response.json());
      const jsons = await Promise.all(jsonPromises);
      const locations = jsons.map(getLocationFromParsedApiJson);

      // complete the location data, now that it's fetched
      cacheLocationData(processedZipCodes, locations);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Error:", e.message);
    }

    return processedZipCodes;
  };

  handleFormSubmit = async (newVoteBundles: VoteBundle[]): Promise<void> => {
    const newZipCodeVotes = this.generateSimpleZipCodes(newVoteBundles);
    const processedZipCodes = await this.processAllLocations(newZipCodeVotes);
    const cityVotes = getCityVotes(processedZipCodes);
    const cityRows = getDescendingCityRows(cityVotes);

    this.setState(prevState => {
      return {
        ...prevState,
        zipCodeVotes: processedZipCodes,
        cityRows
      };
    }, this.saveStateToLocalStorage);
  };

  render(): JSX.Element {
    return (
      <div className={styles.container}>
        <h1>Votes by City</h1>

        <VoteForm onSubmit={this.handleFormSubmit} />

        {/* render this.state.cities summary */}

        <ClearDataButton onClearData={this.clearAllData} />
      </div>
    );
  }
}
