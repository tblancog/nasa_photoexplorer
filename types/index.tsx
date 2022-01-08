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
  rover: "curiosity" | "spirit" | "opportunity";
  camera:
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
  earth_date: string;
  sol: number;
}
