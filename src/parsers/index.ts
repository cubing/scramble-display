import { parse as algParse } from "cubing/alg";
import { Sequence } from "cubing/dist/esm/src/alg";
import { EventID } from "../events";
import { clockParse } from "./clock";
import { megaminxWCAParse } from "./megaminx-wca";
import { skewbFCNParse } from "./skewb-fcn";
import { sq1Parse } from "./sq1";

export function parseForEvent(eventID: EventID, s: string): Sequence {
  switch (eventID) {
    case "clock":
      return clockParse(s);
    case "minx":
      return megaminxWCAParse(s);
    case "skewb":
      return skewbFCNParse(s);
    case "sq1":
      return sq1Parse(s);
    default:
      return algParse(s);
  }
}
