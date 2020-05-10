import { parse, invert } from "cubing/alg";
import { KPuzzle, Puzzles, SVG, KPuzzleDefinition } from "cubing/kpuzzle";
import { EventID, eventInfo } from "../events";
import { ScrambleView } from "./ScrambleView";
import { sq1Parse } from "../parsers";

export class SVG2DView implements ScrambleView {
  private svg: SVG;
  private definition: KPuzzleDefinition;
  private kpuzzle: KPuzzle;
  constructor(private eventID: EventID) {
    const svgID = eventInfo[eventID].svgID;
    if (!svgID) {
      throw "Unknown SVG puzzle.";
    }
    this.definition = Puzzles[svgID];
    this.kpuzzle = new KPuzzle(this.definition);
    this.svg = new SVG(this.definition);

    // Remove title elem so that the parent elem title can be used.
    const titleElem = this.svg.element.querySelector("title");
    titleElem?.parentElement?.removeChild(titleElem);
  }

  public resetScramble() {
    this.setScramble("");
  }

  public setScramble(scramble: string): void {
    this.kpuzzle.reset();
    try {
      const seq = (this.eventID === "sq1") ? sq1Parse(scramble) : parse(scramble);
      this.kpuzzle.applyAlg(seq);
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
