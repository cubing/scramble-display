import { puzzles } from "cubing/puzzles";
import { KPuzzle, KPuzzleDefinition, KPuzzleSVGWrapper } from "cubing/kpuzzle";
import { EventID, eventInfo } from "../events";
import { parseForEvent } from "../parsers";
import { ScrambleView } from "./ScrambleView";

export class SVG2DScrambleView implements ScrambleView {
  private elementWrapper: HTMLDivElement = document.createElement("div");
  private svg: Promise<KPuzzleSVGWrapper>;
  private definition: Promise<KPuzzleDefinition>;
  private kpuzzle: KPuzzle;
  constructor(private eventID: EventID) {
    const svgID = eventInfo[eventID].svgID;
    if (!svgID) {
      throw "Unknown SVG puzzle.";
    }
    this.definition = puzzles[svgID].def();
    this.svg = (async () => {
      this.kpuzzle = new KPuzzle(await this.definition);
      const svg = new KPuzzleSVGWrapper(
        await this.definition,
        await puzzles[svgID].svg()
      );
      this.elementWrapper.appendChild(svg.element);

      // Remove title elem so that the parent elem title can be used.
      const titleElem = svg.element.querySelector("title");
      titleElem?.parentElement?.removeChild(titleElem);

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
      console.log(e);
      throw new Error("Invalid scramble!"); // TODO
    }
    (async () => {
      (await this.svg).draw(await this.definition, this.kpuzzle.state);
    })();
  }

  get element(): HTMLElement {
    return this.elementWrapper;
  }

  private static svgID(eventID: EventID): string | undefined {
    return eventInfo[eventID]?.svgID;
  }

  public static eventImplemented(eventID: EventID): boolean {
    return !!this.svgID(eventID);
  }

  public setCheckered(checkered: boolean): void {
    this.element.classList.toggle("checkered", checkered);
  }
}
