import { parse as algParse, algToString } from "cubing/alg";
import { Sequence } from "cubing/dist/esm/src/alg";
import { EventID } from "../events";
import { megaminxWCAParse } from "./megaminx-wca";
import { clockParse } from "./clock";
import { sq1Parse } from "./sq1";

export function parseInEvent(eventID: EventID, s: string): Sequence {
  switch (eventID) {
    case "sq1":
      return sq1Parse(s);
    case "minx":
      return megaminxWCAParse(s)
    case "clock":
      return clockParse(s)
    default:
      return algParse(s);
  }
}

console.log(algToString(parseInEvent("clock", "UR3- DR3+ DL5- UL1+ U3+ R3+ D2+ L3+ ALL3- y2 U2+ R2+ D0+ L1- ALL0+ DL")));

