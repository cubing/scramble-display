import { Alg, AlgBuilder, Move, QuantumMove } from "cubing/alg";
import { EventID } from "../events";
import { clockParse } from "./clock";
import { megaminxWCAParse } from "./megaminx-wca";
import { skewbFCNParse } from "./skewb-fcn";
import { sq1Parse } from "./sq1";

function jsonToAlg(json: any): Alg {
  const algBuilder = new AlgBuilder();
  for (const unitJSON of json.nestedUnits) {
    if (unitJSON.type !== "blockMove") {
      throw new Error("invalid alg");
    }
    algBuilder.push(
      new Move(
        new QuantumMove(
          unitJSON.family,
          unitJSON.innerLayer,
          unitJSON.outerLayer
        ),
        unitJSON.amount
      )
    );
  }
  return algBuilder.toAlg();
}

export function parseForEvent(eventID: EventID, s: string): Alg {
  switch (eventID) {
    case "clock":
      return jsonToAlg(clockParse(s));
    case "minx":
      return jsonToAlg(megaminxWCAParse(s));
    case "skewb":
      return jsonToAlg(skewbFCNParse(s));
    case "sq1":
      return jsonToAlg(sq1Parse(s));
    default:
      return new Alg(s);
  }
}
