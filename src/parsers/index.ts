import { Alg } from "cubing/alg";
import { EventID } from "../events";
import { clockParse } from "./clock";
import { megaminxWCAParse } from "./megaminx-wca";
import { skewbFCNParse } from "./skewb-fcn";
import { sq1Parse } from "./sq1";

export function parseForEvent(eventID: EventID, s: string): Alg {
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
      return new Alg(s);
  }
}
