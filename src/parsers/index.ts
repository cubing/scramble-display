import { parse as algParse } from "cubing/alg";
import { Sequence } from "cubing/dist/esm/src/alg";
import { EventID } from "../events";
import { megaminxWCAParse } from "./megaminx-wca";
import { sq1Parse } from "./sq1";

export function parseInEvent(eventID: EventID, s: string): Sequence {
  switch (eventID) {
    case "sq1":
      return sq1Parse(s);
    case "minx":
      return megaminxWCAParse(s)
    default:
      return algParse(s);
  }
}
