import { parse } from "cubing/alg";
import { KPuzzle, Puzzles, SVG, KPuzzleDefinition } from "cubing/kpuzzle";
import { EventID, eventInfo } from "../events";
import { ScrambleView } from "./ScrambleView";

export class SVG2DView implements ScrambleView {
  private svg: SVG;
  private definition: KPuzzleDefinition;
  private kpuzzle: KPuzzle;
  constructor(eventID: EventID) {
    const svgID = eventInfo[eventID].svgID;
    if (!svgID) {
      throw "Unknown SVG puzzle.";
    }
    this.definition = Puzzles[svgID];
    this.kpuzzle = new KPuzzle(this.definition);
    this.svg = new SVG(this.definition);

  }

  public resetScramble() {
    this.setScramble("");
  }

  public setScramble(scramble: string): void {
    this.kpuzzle.reset();
    try {
      this.kpuzzle.applyAlg(parse(scramble));
    } catch (e) {
      throw new Error("Invalid scramble!"); // TODO
    }
    this.svg.draw(this.definition, this.kpuzzle.state);
  }

  get element(): HTMLElement {
    return this.svg.element;
  }

  private static svgID(eventID: EventID): string | undefined {
    return eventInfo[eventID].svgID;
  }

  public static eventImplemented(eventID: EventID): boolean {
    return !!this.svgID(eventID);
  }
}
