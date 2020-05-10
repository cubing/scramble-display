import { KPuzzle, KPuzzleDefinition, SVG } from "cubing/kpuzzle";
import { EventID, eventInfo } from "../events";
import { parseInEvent } from "../parsers";
import { ScrambleView } from "./ScrambleView";
import { puzzles } from "./vendor/DisplayablePG3D";

export class SVGPGScrambleView implements ScrambleView {
  private svg: SVG;
  private definition: KPuzzleDefinition;
  private kpuzzle: KPuzzle;
  constructor(private eventID: EventID) {
    const pgID = eventInfo[eventID].svgPGID;
    if (!pgID) {
      throw "Unknown PG SVG puzzle.";
    }
    const displayablePuzzle = puzzles[pgID];

    this.definition = displayablePuzzle.kpuzzleDefinition();
    this.definition.svg = displayablePuzzle.svg();
    this.kpuzzle = new KPuzzle(this.definition);
    this.svg = new SVG(this.definition);
  }

  public resetScramble() {
    this.setScramble("");
  }

  public setScramble(scramble: string): void {
    this.kpuzzle.reset();
    try {
      this.kpuzzle.applyAlg(parseInEvent(this.eventID, scramble));
    } catch (e) {
      throw new Error("Invalid scramble!"); // TODO
    }
    this.svg.draw(this.definition, this.kpuzzle.state);
  }

  get element(): HTMLElement {
    return this.svg.element;
  }

  private static svgPGID(eventID: EventID): string | undefined {
    return eventInfo[eventID].svgPGID;
  }

  public static eventImplemented(eventID: EventID): boolean {
    return !!this.svgPGID(eventID);
  }
}
