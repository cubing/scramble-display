import { cube3x3x3 } from "cubing/puzzles";
import { KPuzzle, KPuzzleDefinition, KPuzzleSVGWrapper } from "cubing/kpuzzle";
import { EventID, eventInfo } from "../events";
import { parseForEvent } from "../parsers";
import { ScrambleView } from "./ScrambleView";
import { puzzles } from "./vendor/DisplayablePG3D";

export class SVGPGScrambleView implements ScrambleView {
  private elementWrapper: HTMLDivElement = document.createElement("div");
  private svg: Promise<KPuzzleSVGWrapper>;
  private definition: Promise<KPuzzleDefinition>;
  private kpuzzle: KPuzzle;
  constructor(private eventID: EventID) {
    const pgID = eventInfo[eventID].svgPGID;
    if (!pgID) {
      throw "Unknown PG SVG puzzle.";
    }
    const displayablePuzzle = puzzles[pgID];

    this.definition = displayablePuzzle.kpuzzleDefinition();
    this.kpuzzle = new KPuzzle(await this.definition);
    this.svg = (async () => {
      const svg = new KPuzzleSVGWrapper(
        await this.definition,
        await cube3x3x3.svg()
      );
      this.elementWrapper.appendChild(svg.element);
      return svg;
    })();
  }

  public resetScramble() {
    this.setScramble("");
  }

  public setScramble(scramble: string): void {
    this.kpuzzle.reset();
    try {
      this.kpuzzle.applyAlg(parseForEvent(this.eventID, scramble));
    } catch (e) {
      throw new Error("Invalid scramble!"); // TODO
    }
    (async () => {
      (await this.svg).draw(this.definition, this.kpuzzle.state);
    })();
  }

  get element(): HTMLElement {
    return this.elementWrapper;
  }

  private static svgPGID(eventID: EventID): string | undefined {
    return eventInfo[eventID]?.svgPGID;
  }

  public static eventImplemented(eventID: EventID): boolean {
    return !!this.svgPGID(eventID);
  }

  public setCheckered(checkered: boolean): void {
    this.element.classList.toggle("checkered", checkered);
  }
}
