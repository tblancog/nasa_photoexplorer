export const rovers = {
  name: "rover",
  title: "Select Rover",
  items: [
    { title: "Curiosity", value: "curiosity" },
    { title: "Opportunity", value: "opportunity" },
    { title: "Spirit", value: "spirit" },
  ],
};
export const cameras = {
  name: "camera",
  title: "Select camera",
  items: [
    {
      value: "fhaz",
      title: "Front Hazard Avoidance Camera",
      rovers: ["curiosity", "opportunity", "spirit"],
    },
    {
      value: "rhaz",
      title: "Rear Hazard Avoidance Camera",
      rovers: ["curiosity", "opportunity", "spirit"],
    },
    { value: "mast", title: "Mast Camer", rovers: ["curiosity"] },
    {
      value: "chemcam",
      title: "Chemistry and Camera Comple",
      rovers: ["curiosity"],
    },
    { value: "mahli", title: "Mars Hand Lens Image", rovers: ["curiosity"] },
    { value: "mardi", title: "Mars Descent Image", rovers: ["curiosity"] },
    {
      value: "navcam",
      title: "Navigation Camera",
      rovers: ["opportunity", "spirit"],
    },
    {
      value: "pancam",
      title: "Panoramic Camera",
      rovers: ["opportunity", "spirit"],
    },
    {
      value: "minites",
      title: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      rovers: ["opportunity", "spirit"],
    },
  ],
};
