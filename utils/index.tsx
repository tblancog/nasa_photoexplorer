import { Filter, SearchAction, SearchState } from "../types";

export const toUnixDate = (date: Date | null): string | null => {
  if (!date) {
    return null;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date?.getDate()}`;
};

export const initialState: SearchState = {
  filter: {
    rover: "curiosity",
    camera: "",
    earth_date: new Date(),
    sol: 1000,
  },
  results: [],
  loading: false,
  page: 1,
};

// search reducer
export const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case "FILTER_UPDATE":
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload.filter,
        },
        results: action.payload.results,
      };

    case "NEXT_PAGE":
      const newPage = state.page + 1;
      return {
        ...state,
        page: newPage,
        results: state.results.concat(action.payload),
      };

    case "TOGGLE_LOADING":
      return {
        ...state,
        loading: !state.loading,
      };

    default:
      return state;
  }
};

export const fetchRoverPhotos = async (filter: Filter, page = 1) => {
  // Rover path filter
  let currentRover = filter.rover === "" ? "curiosity" : filter.rover;
  const { rover, earth_date, ...rest } = filter;

  // To querystring
  const qsParams = Object.keys(rest)
    .filter((f) => rest[f] !== "")
    .map((f) => `${f}=${rest[f]}`)
    .join("&");

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/rovers/${currentRover}/photos?&api_key=${process.env.NEXT_PUBLIC_API_BASE_API_KEY}&${qsParams}&page=${page}`;
  const res = await fetch(url);
  const { photos } = await res.json();
  return photos;
};
