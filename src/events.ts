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
    pg3dID: "2x2x2",
  },
  "333": {
    name: "3x3x3 Cube",
    svgID: "3x3x3",
  },
  "444": {
    name: "4x4x4 Cube",
    pg3dID: "4x4x4",
    svgPGID: "4x4x4",
  },
  "555": {
    name: "5x5x5 Cube",
    pg3dID: "5x5x5",
    svgPGID: "5x5x5",
  },
  "666": {
    name: "6x6x6 Cube",
    pg3dID: "6x6x6",
    svgPGID: "6x6x6",
  },
  "777": {
    name: "7x7x7 Cube",
    pg3dID: "7x7x7",
    svgPGID: "7x7x7",
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
    name: "Square-1",
    svgID: "sq1",
  },
  "444bf": {
    name: "4x4x4 Blindfolded",
    pg3dID: "4x4x4",
    svgPGID: "4x4x4",
  },
  "555bf": {
    name: "5x5x5 Blindfolded",
    pg3dID: "5x5x5",
    svgPGID: "5x5x5",
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
