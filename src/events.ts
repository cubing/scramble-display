export type EventID =
  | "222"
  | "333"
  | "444"
  | "555"
  | "666"
  | "777"
  | "333bf"
  | "333fm"
  | "333oh"
  | "clock"
  | "minx"
  | "pyram"
  | "skewb"
  | "sq1"
  | "444bf"
  | "555bf"
  | "333mbf"
  | "333ft";

type EventInfoData = {
  name: string;
  puzzleID: string;
};

export const eventInfo: { [eventId: string]: EventInfoData } = {
  "222": {
    name: "2x2x2 Cube",
    puzzleID: "2x2x2",
  },
  "333": {
    name: "3x3x3 Cube",
    puzzleID: "3x3x3",
  },
  "444": {
    name: "4x4x4 Cube",
    puzzleID: "4x4x4",
  },
  "555": {
    name: "5x5x5 Cube",
    puzzleID: "5x5x5",
  },
  "666": {
    name: "6x6x6 Cube",
    puzzleID: "6x6x6",
  },
  "777": {
    name: "7x7x7 Cube",
    puzzleID: "7x7x7",
  },
  "333bf": {
    name: "3x3x3 Blindfolded",
    puzzleID: "3x3x3",
  },
  "333fm": {
    name: "3x3x3 Fewest Moves",
    puzzleID: "3x3x3",
  },
  "333oh": {
    name: "3x3x3 One - Handed",
    puzzleID: "3x3x3",
  },
  clock: {
    name: "Clock",
    puzzleID: "clock", // TODO: Proper clock notation.
  },
  minx: {
    name: "Megaminx",
    puzzleID: "megaminx",
  },
  pyram: {
    name: "Pyraminx",
    puzzleID: "pyraminx",
  },
  skewb: {
    name: "Skewb",
    puzzleID: "skewb",
  },
  sq1: {
    name: "Square-1",
    puzzleID: "sq1",
  },
  "444bf": {
    name: "4x4x4 Blindfolded",
    puzzleID: "4x4x4",
  },
  "555bf": {
    name: "5x5x5 Blindfolded",
    puzzleID: "5x5x5",
  },
  "333mbf": {
    name: "3x3x3 Multi - Blind",
    puzzleID: "3x3x3",
  },
  "333ft": {
    name: "3x3x3 With Feet",
    puzzleID: "3x3x3",
  },
};
