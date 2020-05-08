export type EventID = "222" | "333" | "444" | "555" | "666" | "777" | "333bf" | "333fm" | "333oh" | "clock" | "minx" | "pyram" | "skewb" | "sq1" | "444bf" | "555bf" | "333mbf" | "333ft";

type EventInfoData = {
  name: string,
  svgID?: string,
  pg3dID?: string,
  svgPGID?: string
};

export const eventInfo: { [eventId: string]: EventInfoData } = {
  "222": {
    name: "2x2x2 Cube",
    svgID: "2x2x2",
  },
  "333": {
    name: "3x3x3 Cube",
    svgID: "3x3x3",
  },
  "444": {
    name: "4x4x4 Cube",
  },
  "555": {
    name: "5x5x5 Cube",
  },
  "666": {
    name: "6x6x6 Cube",
  },
  "777": {
    name: "7x7x7 Cube",
  },
  "333bf": {
    name: "3x3x3 Blindfolded",
    svgID: "3x3x3",
  },
  "333fm": {
    name: "3x3x3 Fewest Moves",
    svgID: "3x3x3",
  },
  "333oh": {
    name: "3x3x3 One - Handed",
    svgID: "3x3x3",
  },
  "clock": {
    name: "Clock",
    svgID: "clock", // TODO: Proper clock notation.
  },
  "minx": {
    name: "Megaminx",
    pg3dID: "megaminx",
    svgPGID: "megaminx",
  },
  "pyram": {
    name: "Pyraminx",
    svgID: "pyraminx",
  },
  "skewb": {
    name: "Skewb",
    pg3dID: "skewb",
    svgPGID: "skewb",
  },
  "sq1": {
    name: "Square - 1",
  },
  "444bf": {
    name: "4x4x4 Blindfolded",
  },
  "555bf": {
    name: "5x5x5 Blindfolded",
  },
  "333mbf": {
    name: "3x3x3 Multi - Blind",
    svgID: "3x3x3",
  },
  "333ft": {
    name: "3x3x3 With Feet",
    svgID: "3x3x3",
  },
};
