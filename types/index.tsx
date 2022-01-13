export interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: number;
  status: string;
}

export interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

export interface Filter {
  [key: string]: string | number | undefined | null;
  rover?: "curiosity" | "spirit" | "opportunity" | "";
  camera?:
    | "fhaz"
    | "rhaz"
    | "mast"
    | "chemcam"
    | "mahli"
    | "mardi"
    | "navcam"
    | "pancam"
    | "minites"
    | "";
  earth_date: any;
  sol: number;
}

export interface SearchState {
  filter: Filter;
  results: Photo[];
  loading: boolean;
  page: number;
}

export type SearchAction =
  | { type: "FILTER_UPDATE"; payload: any }
  | { type: "NEXT_PAGE"; payload: any }
  | { type: "TOGGLE_LOADING" };
